'use client';

import { useEffect, useState } from 'react';
import { profileUpdatedEvent } from '../constants';
import { getDemoProfile, loadSavedProfile, publishProfileUpdate, saveProfile } from '../services/profile.service';
import type { ExpertiseProfile } from '../types/profile';

export function useProfile() {
  const [profile, setProfile] = useState<ExpertiseProfile>(getDemoProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(loadSavedProfile());
    setIsLoaded(true);

    function handleProfileUpdate(event: Event) {
      const updatedProfile = (event as CustomEvent<ExpertiseProfile>).detail;
      setProfile(updatedProfile ?? loadSavedProfile());
    }

    function handleStorageUpdate() {
      setProfile(loadSavedProfile());
    }

    window.addEventListener(profileUpdatedEvent, handleProfileUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener(profileUpdatedEvent, handleProfileUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  function updateProfile(profileUpdate: Partial<ExpertiseProfile>) {
    const updatedProfile = { ...profile, ...profileUpdate };
    setProfile(updatedProfile);
    publishProfileUpdate(updatedProfile);
  }

  function persistProfile() {
    saveProfile(profile);
  }

  return { profile, isLoaded, updateProfile, persistProfile };
}