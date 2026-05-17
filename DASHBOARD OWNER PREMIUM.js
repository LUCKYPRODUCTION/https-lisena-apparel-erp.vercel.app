// apps/web/src/app/(dashboard)/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { useRealtimeData } from '@/hooks/use-realtime'
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react'
import { LineChart, BarChart, PieChart } from 'recharts'

export default function OwnerDashboard() {
  const [data, setData] = useState({
    totalOrders: 0,
    monthlyRevenue: 0,
    monthlyProfit: 0,
    activeProduction: 0,
    pendingPayments: 0,
    topCustomers: [],
    productionProgress: 75.5
  })

  const { subscribe } = useRealtimeData()

  useEffect(() => {
    // Realtime subscriptions
    const unsub = subscribe('dashboard', (newData) => {
      setData(newData)
    })
    return () => unsub()
  }, [])

  const salesChartData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 2210 },
    // ... more data
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Order" 
          value={`Rp ${data.monthlyRevenue.toLocaleString()}`}
          change="+12.5%"
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
        />
        <KpiCard 
          title="Profit Bulan Ini" 
          value={`Rp ${data.monthlyProfit.toLocaleString()}`}
          change="+8.2%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
        />
        <KpiCard 
          title="Produksi Aktif" 
          value={data.activeProduction}
          change="-2%"
          icon={<Package className="h-6 w-6" />}
          trend="down"
        />
        <KpiCard 
          title="Piutang" 
          value={`Rp ${data.pendingPayments.toLocaleString()}`}
          change="+5%"
          icon={<Users className="h-6 w-6" />}
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glassmorphism col-span-2">
          <CardHeader>
            <CardTitle>Penjualan & Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={salesChartData} />
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Top Customer</CardTitle>
          </CardHeader>
          <CardContent>
            {data.topCustomers.map((customer) => (
              <div key={customer.id} className="flex justify-between py-2">
                <span>{customer.name}</span>
                <Badge>Rp {customer.revenue.toLocaleString()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Production Monitor */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Production Monitor Real-time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Progress Keseluruhan</span>
              <Badge variant="secondary">{data.productionProgress}%</Badge>
            </div>
            <Progress value={data.productionProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
