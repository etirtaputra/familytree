'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌳</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Family Tree Tracker</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/family-trees/demo" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              Demo
            </Link>
            {!loading && user ? (
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build Your Family Tree
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Track names, relationships, and locations. Connect your family across generations and share your legacy with the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!loading && user ? (
              <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors">
                  Get Started Free
                </Link>
                <Link href="/family-trees/demo" className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Try Demo
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Track Members</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Add family members with names, birth dates, photos, and bios. Build your family tree organically.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect Relationships</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Define parent-child, sibling, and marriage relationships. Visualize your family structure.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Map Locations</h3>
            <p className="text-gray-700 dark:text-gray-300">
              See where your family members live. Discover connections across cities and countries.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🌳</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visualize Tree</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Beautiful hierarchical tree display. See generations unfold at a glance.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Share & Go Viral</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Generate unique shareable links. Invite family to contribute and grow your tree.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Track Growth</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Watch your family tree grow with sharing analytics. See who joined through your links.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Family Tree?</h3>
          <p className="text-lg mb-8 opacity-90">
            Create your first family tree in minutes and start connecting with your relatives.
          </p>
          {!loading && user ? (
            <Link href="/dashboard" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/auth/signup" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Create Free Account
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Family Tree Tracker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
