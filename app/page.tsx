'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Navigation */}
      <nav className="     ite/10 backdrop-blur-md    der-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items        <div className="max-w-6xl mx-au className="text-2xl font-bold text-white">🌳 Family Tree Tracker</h1>
          {us          {us          {us          {ex items-center space-x-4">
              <span className="text-white">{user.email}</span>
              <Link href="/dashboard" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transitio              <Link href="/rd
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
                                                             h                                                             h                                          /auth/signup" className="px-6 p        hite te        600 r     d-   font-medium hover:bg-gray-100 transition">
                Sign Up
              </Link>
                             )                             )                             )             sName="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            Discover and Share Your Family Heritage
          </h2>
          <p className="text-xl text-blue-100          <p className="text-xl text-blue-100          <p cly t          <p className="text-xl text-blue-100          <p className="text-xl text-blue-100          <p cly t          <p className="text-xl text-blue-100                  {!user ? (
                
                <Link href="/auth/signup" className="px-8 py-4 bg-white text-b                <Link href="/auth/signup" className="px-8 py-4 bg-white text-b                <Link href="/auth/signup" className="px-8 py-4 bg-white text-b                <Link href="/auth/signup" className="px-8 py-4 bg-white text-b                <Link href="/auth/signup" g                 <Lin tra               border-                <Link href="/auth/signup" className="px-8 py-4 bg-white text-b                <Link href="/auth/signup" className="px-8 py-as   me="px-8 py-4 bg-white text-blue-600 roun                <Link href="/auth/signup" className="px-8 py-lg">
                Go to Dashboard
              </Link>
                                                                                                                                                                                                                                                                                                    <h3 clas            2xl font-bold text-white mb-3">Track Family Members</h3>
            <p className="text-blue-100">
              Add family members with names, birth/death dates, photos, bios, and locations.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-white mb-3">Define Relationships</h3>
            <p className="text-blue-100">
              Create parent-child, spouse, and sibling relationships to build your family structure.
            </p>
          </div>

          <div           <div           <dirop-blur-md rounded-lg p-8          <div           <div           <dirop-blur-md rounded-lg p-8          <div           <div           <dirop-blur-md rounded-lg p-8          <div           <div           <dirop-blur-md rounded-lg p-8          <div           <div           <dirop-bluap to understand geographic connections.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border b          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border b          <disN          2xl font-bold text-white mb-3">Visualize Trees</h3>
            <p className="text-blue-100">
              See hierarchical family trees with clear parent-child relationships and connections.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-white mb-3">Share Easily</h3>
            <p className="text-blue-100">
              Generate shareable links to let family members view and contribute to your tree.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold             <h3">P            <h3 className="text-2xl font-bold             <h3">P            <h3 className="text-2xl font-bold             <h3">P            <h3 className="text-2xl font-bold             <h3">P            <h3 className="text-2xl fon}
            <h3 className="text-2xl fonkdr            <h3 className="text-2xl fonkdr            <h3 className="text-2xl fonkdr            < font-bold text-white mb-4">See It In            <h3 className="text-2xl fonkdr            <h3 className="text-2xl fonkdr         e our demo to see how you can organize, visualize, and share your family tree.
          </p>
          <Link href="/family-trees/demo" className="inline-block px-8 py-3 bg-white           <Link href="/family-trees/demo" className="inline-block px-8 py-3 bg-white                 </Link>
              
      </div>
    </div>
  );
}
