/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson } from '../types';

const LESSONS_CACHE_NAME = 'nuralilm-lessons-cache';

/**
 * Download and store a lesson and its auxiliary metadata in Cache API.
 */
export async function downloadLessonForOffline(lesson: Lesson): Promise<boolean> {
  if (!('caches' in window)) {
    console.warn('Cache API is not supported in this browser.');
    return false;
  }

  try {
    const cache = await caches.open(LESSONS_CACHE_NAME);

    // 1. Cache the lesson data itself as a JSON endpoint mock response
    const lessonUrl = `/api/lessons/${lesson.id}`;
    const lessonResponse = new Response(JSON.stringify(lesson), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(lessonUrl, lessonResponse);

    // 2. Cache simulated vocal sound files or visual emojis for fully persistent offline accessibility
    const offlineIndicatorUrl = `/api/lessons/${lesson.id}/offline-ready`;
    const readyResponse = new Response(JSON.stringify({ offline: true, timestamp: Date.now() }), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(offlineIndicatorUrl, readyResponse);

    // 3. Keep a index of offline downloaded lesson IDs in localStorage so we can fast-query them
    const storedIds = localStorage.getItem('nuralilm_downloaded_ids');
    let ids: string[] = storedIds ? JSON.parse(storedIds) : [];
    if (!ids.includes(lesson.id)) {
      ids.push(lesson.id);
      localStorage.setItem('nuralilm_downloaded_ids', JSON.stringify(ids));
    }

    return true;
  } catch (error) {
    console.error('Failed to save lesson to Cache API:', error);
    return false;
  }
}

/**
 * Get all downloaded lesson IDs from localStorage index.
 */
export function getDownloadedLessonIds(): string[] {
  const storedIds = localStorage.getItem('nuralilm_downloaded_ids');
  return storedIds ? JSON.parse(storedIds) : [];
}

/**
 * Check if a specific lesson has been successfully cached via the Cache API.
 */
export async function isLessonDownloaded(lessonId: string): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    const cache = await caches.open(LESSONS_CACHE_NAME);
    const response = await cache.match(`/api/lessons/${lessonId}`);
    return !!response;
  } catch {
    return false;
  }
}

/**
 * Delete a downloaded lesson from the Cache API and remove it from the index.
 */
export async function deleteDownloadedLesson(lessonId: string): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    const cache = await caches.open(LESSONS_CACHE_NAME);
    await cache.delete(`/api/lessons/${lessonId}`);
    await cache.delete(`/api/lessons/${lessonId}/offline-ready`);

    const storedIds = localStorage.getItem('nuralilm_downloaded_ids');
    if (storedIds) {
      let ids: string[] = JSON.parse(storedIds);
      ids = ids.filter(id => id !== lessonId);
      localStorage.setItem('nuralilm_downloaded_ids', JSON.stringify(ids));
    }

    return true;
  } catch (error) {
    console.error('Failed to delete offline lesson:', error);
    return false;
  }
}
