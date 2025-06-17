"use client"

import { useState } from "react";
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from "recharts";
import { FiArrowUp, FiArrowDown, FiInfo, FiExternalLink } from "react-icons/fi";

// Paleta de colores para el gráfico circular
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Dashboard({ data }: any) {
  const [funeraria, setFuneraria] = useState(data);
  const [activeTab, setActiveTab] = useState('general');

  // Preparamos datos para los gráficos
  const barChartData = funeraria.map((item: any) => ({
    nombre: item.nombre,
    ranking: item.ranking,
    clientes: item.clientesMensuales,
  }));

  // Datos para el gráfico circular (ranking por funeraria)
  const pieChartData = funeraria.map((item: any) => ({
    name: item.nombre,
    value: item.ranking,
    id: item.id
  }));

  // Estadísticas resumidas
  const stats = [
    {
      title: "Funerarias registradas",
      value: funeraria.length,
      change: "+5%",
      trend: "up"
    },
    {
      title: "Ranking promedio",
      value: (funeraria.reduce((sum: number, item: any) => sum + item.ranking, 0) / funeraria.length).toFixed(1),
      change: "+0.3",
      trend: "up"
    },
    {
      title: "Clientes mensuales",
      value: funeraria.reduce((sum: number, item: any) => sum + item.clientesMensuales, 0),
      change: "-12%",
      trend: "down"
    },
    {
      title: "Mejor ranking",
      value: Math.max(...funeraria.map((item: any) => item.ranking)),
      change: "+0",
      trend: "neutral"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Funerarias</h1>
        <p className="text-gray-600">Análisis y estadísticas de funerarias registradas</p>
      </div>
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stat.trend === 'up' ? <FiArrowUp /> : stat.trend === 'down' ? <FiArrowDown /> : null}
                <span className="text-sm">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de barras mejorado */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Ranking y Clientes Mensuales</h2>
            <div className="flex items-center text-sm text-gray-500">
              <FiInfo />
              <span>Comparativo</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="nombre" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" domain={[0, 10]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 20']} />
                <Tooltip 
                  contentStyle={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="ranking" name="Ranking (1-10)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="clientes" name="Clientes mensuales" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nuevo gráfico circular de rankings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Ranking por Funeraria</h2>
            <div className="flex items-center text-sm text-gray-500">
              <FiInfo />
              <span>Comparación visual</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieChartData.map((entry: any, index: any) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `Ranking: ${value}`,
                    `Funeraria: ${name}`,
                    `ID: ${props.payload.id}`
                  ]}
                  contentStyle={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  formatter={(value, entry, index) => (
                    <span className="text-gray-600 text-sm">
                      {pieChartData[index].name}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            * El tamaño de cada porción representa el ranking (1-10) de cada funeraria
          </div>
        </div>
      </div>

      {/* Listado de funerarias */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Detalle por Funeraria</h2>
          <div className="text-sm text-gray-500">
            Mostrando {funeraria.length} registros
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funeraria.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">{item.nombre}</h3>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Ranking</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.ranking >= 8 ? 'bg-green-100 text-green-800' : 
                    item.ranking >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.ranking}/10
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Clientes mensuales</span>
                  <span className="font-medium">{item.clientesMensuales}</span>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                <a
                  href={"/form/" + item.id}
                  className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  Ver detalles <FiExternalLink />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}