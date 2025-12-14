'use client'

import React from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    // Static transaction data
    const transactions = [
        {
            id: 'TXN-001',
            date: '2024-12-10',
            accountNo: '0123456789',
            customerName: 'Santosh Kumar Mahato',
            amount: 'Rs. 50,000',
            conductorName: 'Teller 1',
            isSuspicious: false
        },
        {
            id: 'TXN-002',
            date: '2024-12-10',
            accountNo: '0987654321',
            customerName: 'Ram Prasad Adhikari',
            amount: 'Rs. 125,000',
            conductorName: 'Teller 2',
            isSuspicious: true
        },
        {
            id: 'TXN-003',
            date: '2024-12-09',
            accountNo: '1234567890',
            customerName: 'Sita Gurung',
            amount: 'Rs. 35,000',
            conductorName: 'Teller 1',
            isSuspicious: false
        },
        {
            id: 'TXN-004',
            date: '2024-12-09',
            accountNo: '5678901234',
            customerName: 'Bhim Prasad Poudel',
            amount: 'Rs. 250,000',
            conductorName: 'Teller 3',
            isSuspicious: true
        },
        {
            id: 'TXN-005',
            date: '2024-12-08',
            accountNo: '6789012345',
            customerName: 'Kamala Sharma',
            amount: 'Rs. 75,000',
            conductorName: 'Teller 2',
            isSuspicious: false
        },
        {
            id: 'TXN-006',
            date: '2024-12-08',
            accountNo: '7890123456',
            customerName: 'Laxmi Tamang',
            amount: 'Rs. 90,000',
            conductorName: 'Teller 1',
            isSuspicious: false
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Transaction list</h1>
                <button 
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                    ← Dashboard
                </button>
            </div>
            <div>
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Transaction ID</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">TranactionDate</th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Account No</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">CustomerName</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Trasaction Amount</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Conductor Name</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">IsSuspicious</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                                    {/* <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created By</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created No</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {transactions.map((transaction, index) => (
                                    <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-blue-600">{transaction.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-700">{transaction.date}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-700">{transaction.accountNo}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-slate-900">{transaction.customerName}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-slate-900">{transaction.amount}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-600">{transaction.conductorName}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                transaction.isSuspicious 
                                                    ? 'bg-red-100 text-red-800 border-red-200' 
                                                    : 'bg-green-100 text-green-800 border-green-200'
                                            }`}>
                                                {transaction.isSuspicious ? 'YES' : 'NO'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button 
                                                className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                                                onClick={() => router.push(`/transactionList/transactionDetails?id=${transaction.id}&date=${transaction.date}&accountNo=${transaction.accountNo}&customerName=${encodeURIComponent(transaction.customerName)}&amount=${encodeURIComponent(transaction.amount)}&conductor=${encodeURIComponent(transaction.conductorName)}&suspicious=${transaction.isSuspicious}`)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        </div>
    )
}

export default Page