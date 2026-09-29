'use client';

import { useEffect, useState } from 'react';
import { getDemoProfile, loadSavedProfile, saveProfile } from '../services/profile.service';
import type { ExpertiseProfile } from '../types/profile';

export function useProfile() {
  const [profile, setProfile] = useState<ExpertiseProfile>(getDemoProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(loadSavedProfile());
    setIsLoaded(true);
  }, []);

  function updateProfile(profileUpdate: Partial<ExpertiseProfile>) {
    setProfile((current) => ({ ...current, ...profileUpdate }));
  }

  function persistProfile() {
    saveProfile(profile);
  }

  return { profile, isLoaded, updateProfile, persistProfile };
}