import { demoExpertiseProfile, profileStorageKey } from '../constants';
import type { ExpertiseProfile } from '../types/profile';

export function getDemoProfile(): ExpertiseProfile {
  return { ...demoExpertiseProfile };
}

export function loadSavedProfile(): ExpertiseProfile {
  if (typeof window === 'undefined') return getDemoProfile();
  const savedProfile = window.localStorage.getItem(profileStorageKey);
  if (!savedProfile) return getDemoProfile();

  try {
    return { ...demoExpertiseProfile, ...JSON.parse(savedProfile) as Partial<ExpertiseProfile> };
  } catch {
    return getDemoProfile();
  }
}

export function saveProfile(profile: ExpertiseProfile): ExpertiseProfile {
  if (typeof window !== 'undefined') window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  return profile;
}