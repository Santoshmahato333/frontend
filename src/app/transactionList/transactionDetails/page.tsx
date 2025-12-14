'use client'
import React, { Suspense } from 'react'
import Header from '@/components/Header'
import { useRouter, useSearchParams } from 'next/navigation'

function TransactionDetailsContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Get transaction data from URL parameters
    const transactionId = searchParams.get('id') || 'N/A';
    const transactionDate = searchParams.get('date') || 'N/A';
    const accountNo = searchParams.get('accountNo') || 'N/A';
    const customerName = searchParams.get('customerName') || 'N/A';
    const amount = searchParams.get('amount') || 'N/A';
    const conductorName = searchParams.get('conductor') || 'N/A';
    const isSuspicious = searchParams.get('suspicious') === 'true';

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div id="detailsPanel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Transaction Details</h2>
                            <p className="text-sm text-slate-500">{transactionId}</p>
                        </div>
                        <button onClick={() => router.push('/transactionList')} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* Transaction Info */}
                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg> Transaction Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Transaction ID</p>
                                    <p className="text-sm font-medium text-slate-900">{transactionId}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Transaction Date</p>
                                    <p className="text-sm font-medium text-slate-900">{transactionDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Account Number</p>
                                    <p className="text-sm font-medium text-slate-900">{accountNo}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Customer Name</p>
                                    <p className="text-sm font-medium text-slate-900">{customerName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Transaction Amount</p>
                                    <p className="text-sm font-medium text-slate-900 text-lg font-bold text-blue-600">{amount}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Conductor Name</p>
                                    <p className="text-sm font-medium text-slate-900">{conductorName}</p>
                                </div>
                            </div>
                        </div>
                        {/* Risk Assessment */}
                        <div className="bg-white rounded-lg p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg> Risk Assessment</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-sm text-slate-700">Suspicious Transaction</span> 
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                        isSuspicious 
                                            ? 'bg-red-100 text-red-800 border-red-200' 
                                            : 'bg-green-100 text-green-800 border-green-200'
                                    }`}>
                                        {isSuspicious ? 'YES' : 'NO'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100"><span className="text-sm text-slate-700">Politically Exposed Person (PEP)</span> <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg> No </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100"><span className="text-sm text-slate-700">Sanctions Hit</span> <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg> No </span>
                                </div>
                                <div className="flex items-center justify-between py-2"><span className="text-sm text-slate-700">Adverse Media</span> <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg> No </span>
                                </div>
                            </div>
                        </div>
                        {/* Documents */}
                        <div className="bg-white rounded-lg p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg> Documents</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Passport</p>
                                            <p className="text-xs text-slate-500">Jan 15, 2024, 10:30 AM</p>
                                        </div>
                                    </div><span className="flex items-center gap-1 text-xs font-semibold text-yellow-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg> Pending </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Utility Bill</p>
                                            <p className="text-xs text-slate-500">Jan 15, 2024, 10:32 AM</p>
                                        </div>
                                    </div><span className="flex items-center gap-1 text-xs font-semibold text-yellow-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg> Pending </span>
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="sticky bottom-0 bg-white border-t border-slate-200 pt-6 -mx-6 px-6 pb-6 flex gap-3"><button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg> Approve </button> <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg> Reject </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <TransactionDetailsContent />
        </Suspense>
    )
}