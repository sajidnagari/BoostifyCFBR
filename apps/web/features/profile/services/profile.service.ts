import { demoExpertiseProfile, profileStorageKey, profileUpdatedEvent } from '../constants';
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

export function publishProfileUpdate(profile: ExpertiseProfile): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<ExpertiseProfile>(profileUpdatedEvent, { detail: profile }));
  }
}

export function saveProfile(profile: ExpertiseProfile): ExpertiseProfile {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
    publishProfileUpdate(profile);
  }
  return profile;
}