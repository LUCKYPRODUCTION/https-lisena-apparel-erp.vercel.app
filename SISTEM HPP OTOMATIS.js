// hooks/use-hpp-calculator.ts
import { useState, useCallback } from 'react'

export function useHppCalculator() {
  const calculateHpp = useCallback((order: OrderFormData) => {
    // 1. BAHAN BAKU
    const fabricUsage = (order.quantity * 1.2) / 100 // 1.2m per pcs + waste 20%
    const fabricCost = fabricUsage * getFabricPrice(order.fabricType)
    
    const ribUsage = order.quantity * 0.15 // 15cm per pcs
    const ribCost = ribUsage * getRibPrice()
    
    // Print cost
    const printCost = order.printType.reduce((total, type) => {
      return total + (order.quantity * getPrintCost(type))
    }, 0)

    // 2. PRODUKSI
    const productionCost = order.quantity * 15000 // Rp15k per pcs all process
    
    // 3. OVERHEAD
    const overheadPerPcs = 2000 // Rp2k per pcs
    
    // 4. TOTAL HPP
    const totalHpp = fabricCost + ribCost + printCost + productionCost + overheadPerPcs
    
    // 5. PROFIT CALCULATION
    const targetProfitMargin = 40 // 40%
    const sellingPrice = totalHpp / (1 - targetProfitMargin / 100)
    const profit = sellingPrice - totalHpp
    
    return {
      fabricCost,
      ribCost,
      printCost,
      productionCost,
      overheadPerPcs,
      totalHpp: Math.round(totalHpp),
      sellingPrice: Math.round(sellingPrice),
      profit: Math.round(profit),
      profitPercent: targetProfitMargin
    }
  }, [])

  return { calculateHpp }
}
