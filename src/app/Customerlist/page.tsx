'use client'

import React from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Customer list</h1>
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

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">KYC No</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date Of Birth</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">NID</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Father Name</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Risk Grading</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created By</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created No</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03001</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center font-bold text-white text-sm">
                                                SM
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Santosh Kumar Mahato</p>
                                                <p className="text-xs text-slate-500">santosh.kumar@example.com</p>
                                            </div>
                                        </div></td>

                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2057-10-12 B.S</p>
                                            <p className="text-sm text-slate-700">2000-03-27 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">123-123-123-1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Raj Kumar Mahato</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">LOW</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 15, 2024, 10:30 AM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03002</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
                                                RP
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Ram Prasad Adhikari</p>
                                                <p className="text-xs text-slate-500">ram.adhikari@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2055-05-15 B.S</p>
                                            <p className="text-sm text-slate-700">1998-09-01 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">456-789-012-3</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Krishna Prasad Adhikari</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">MEDIUM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 2</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 16, 2024, 11:15 AM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03003</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center font-bold text-white text-sm">
                                                SG
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Sita Gurung</p>
                                                <p className="text-xs text-slate-500">sita.gurung@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2060-02-20 B.S</p>
                                            <p className="text-sm text-slate-700">2003-06-05 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">789-012-345-6</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Dhan Bahadur Gurung</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">LOW</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 17, 2024, 09:45 AM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03004</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center font-bold text-white text-sm">
                                                BP
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Bhim Prasad Poudel</p>
                                                <p className="text-xs text-slate-500">bhim.poudel@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2052-08-10 B.S</p>
                                            <p className="text-sm text-slate-700">1995-11-25 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">234-567-890-1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Hari Prasad Poudel</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-red-100 text-red-800 border-red-200">HIGH</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 3</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 18, 2024, 02:20 PM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03005</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center font-bold text-white text-sm">
                                                KS
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Kamala Sharma</p>
                                                <p className="text-xs text-slate-500">kamala.sharma@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2058-11-25 B.S</p>
                                            <p className="text-sm text-slate-700">2002-03-10 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">567-890-123-4</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Govinda Sharma</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">LOW</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 2</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 19, 2024, 10:00 AM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03006</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center font-bold text-white text-sm">
                                                LT
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Laxmi Tamang</p>
                                                <p className="text-xs text-slate-500">laxmi.tamang@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2061-03-18 B.S</p>
                                            <p className="text-sm text-slate-700">2004-07-02 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">890-123-456-7</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Nima Tamang</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">MEDIUM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 20, 2024, 03:30 PM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-blue-600">01-8283-03007</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
                                                AS
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Arjun Shrestha</p>
                                                <p className="text-xs text-slate-500">arjun.shrestha@example.com</p>
                                            </div>
                                        </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-slate-700">2054-06-30 B.S</p>
                                            <p className="text-sm text-slate-700">1997-10-15 A.D</p>
                                        </div>
                                    </div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">345-678-901-2</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-700">Mohan Shrestha</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">MEDIUM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Teller 3</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-slate-600">Jan 21, 2024, 01:15 PM</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">View</button> <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">Approve</button> <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">Reject</button>
                                        </div></td>
                                </tr>

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