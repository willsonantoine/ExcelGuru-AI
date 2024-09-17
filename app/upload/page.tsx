"use client"
import React, { useState } from 'react';
import { Input, Button, Modal, Textarea, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UploadExcelPage() {
  const [data, setData] = useState<Array<any>>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Nombre de valeurs par colonne',
        data: [],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Nombre de valeurs uniques par colonne',
        data: [],
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
      {
        label: 'Moyenne par colonne',
        data: [],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
      {
        label: 'Écart type par colonne',
        data: [],
        backgroundColor: '#F44336',
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  });
  
  const [description, setDescription] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        setColumns(jsonData[0]);
        setData(jsonData.slice(1));
        const columnStats: any = calculateColumnStats(jsonData);
        setChartData({
          labels: jsonData[0],
          datasets: [
            {
              label: 'Nombre de valeurs par colonne',
              data: columnStats.map((stat: any) => stat.nbValeurs),
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 1,
            },
            {
              label: 'Nombre de valeurs uniques par colonne',
              data: columnStats.map((stat: any) => stat.nbValeursUniques),
              backgroundColor: '#FF9800',
              borderColor: '#F57C00',
              borderWidth: 1,
            },
            {
              label: 'Moyenne par colonne',
              data: columnStats.map((stat: any) => stat.moyenne),
              backgroundColor: '#2196F3',
              borderColor: '#1976D2',
              borderWidth: 1,
            },
            {
              label: 'Écart type par colonne',
              data: columnStats.map((stat: any) => stat.ecartType),
              backgroundColor: '#F44336',
              borderColor: '#D32F2F',
              borderWidth: 1,
            },
          ],
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const calculateColumnStats = (jsonData: any[]) => {
    const columnStats: any[] = [];
    jsonData[0].forEach((header: string) => {
      const columnData: any = jsonData.slice(1).map((row: any[]) => row[jsonData[0].indexOf(header)]);
      const moyenne = columnData.reduce((acc: any, val: any) => acc + Number(val), 0) / columnData.length;
      columnStats.push({
        header,
        nbValeurs: columnData.length,
        nbValeursUniques: new Set(columnData).size,
        moyenne,
        ecartType: Math.sqrt(
          columnData.map((val: any) => Math.pow(Number(val) - moyenne, 2)).reduce((acc: any, val: any) => acc + val, 0) /
            (columnData.length - 1)
        ),
      });
    });
    return columnStats;
  };

  const handleScan = async () => {
    // Format the prompt for GPT-4
    
 
    setModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-5 transition-colors duration-300">
      {/* Upload Card */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg w-full max-w-3xl p-6 mb-6 transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4">Uploader un fichier Excel</h3>
        <Input fullWidth type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>

      {/* Chart Card */}
      {data.length > 0 && (
        <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg w-full max-w-3xl p-6 mb-6 transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Statistiques sur les données</h3>
          <div className="w-full h-96">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      color: '#333',
                      font: {
                        size: 14,
                        weight: 'bold',
                      },
                      boxWidth: 20,
                    },
                  },
                  title: {
                    display: true,
                    text: 'Statistiques sur les Colonnes',
                    color: '#333',
                    font: {
                      size: 18,
                      weight: 'bold',
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Colonnes',
                      color: '#333',
                      font: {
                        size: 14,
                        weight: 'bold',
                      },
                    },
                    ticks: {
                      color: '#333',
                      font: {
                        size: 12,
                      },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Valeurs',
                      color: '#333',
                      font: {
                        size: 14,
                        weight: 'bold',
                      },
                    },
                    ticks: {
                      color: '#333',
                      font: {
                        size: 12,
                      },
                    },
                    suggestedMin: 0,
                  },
                },
              }}
            />
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-lg mb-4 border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  {columns.map((header) => (
                    <th key={header} className="px-6 py-3 border-b">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell:any, cellIndex:any) => (
                      <td key={cellIndex} className="px-6 py-3 border-b">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Description and Scan Button */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg w-full max-w-3xl p-6 transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4">Ajouter une description</h3>
        <Textarea
          fullWidth
          rows={4}
          placeholder="Ajoutez des descriptions ici..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleScan} color="primary" className="mt-4">
          Scan
        </Button>
      </div>

      {/* Modal for Analysis Result */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalHeader>
          <h2 className="text-xl font-bold">Analyse et Recommandations</h2>
        </ModalHeader>
        <ModalBody>
          <div className="prose dark:prose-dark">
            <p>{analysisResult}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setModalVisible(false)}>Fermer</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
