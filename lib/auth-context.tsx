'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user || null);
      } catch (error) {
        console.error('        console.error('                   r(null);
        console.error('        console.error('                   r(null);
{
;

    const { data: { subscription } } = supabase.auth.on    const { data: { subs ses    const {      set    const { datser |    const { data: { subscription } } = supabase.auth.on    c()    const { data: { subscription } } = supabase.auth.on   rd:     const { data: { subscribase = c    const { data: { subscription } } = supabase.auth.on    const { data:env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.    const { error } = await supabase.    const { options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supabase = createClient(    const supxt === und    const supabase = createClient(    const supabase = createClient(    const supabase = create;
}
