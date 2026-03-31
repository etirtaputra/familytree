'use client';

import React, { useState } from 'react';
import { FamilyTree, ShareableLink } from '@/types/familyTree';
import { FAMILY_TREE_ENUMS } from '@/constants/familyTreeEnums';

interface SharingPanelProps {
  tree: FamilyTree;
  shareLinks?: ShareableLink[];
  onCreateLink?: (accessLevel: 'view_only' | 'can_edit' | 'admin') => void;
  onRevokeLink?: (linkId: string) => void;
  isLoading?: boolean;
}

export const SharingPanel: React.FC<SharingPanelProps> = ({ tree, shareLinks = [], onCreateLink, onRevokeLink, isLoading = false }) => {
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<'view_only' | 'can_edit' | 'admin'>('view_only');

  const copyToClipboard = (slug: string) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/public/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLinkId(slug);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const getAccessLevelLabel = (level: string) => {
    return FAMILY_TREE_ENUMS.ACCESS_LEVELS.find((a) => a.value === level)?.label || level;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tree Visibility</h2>
        <div className="space-y-3">
          {FAMILY_TREE_ENUMS.VISIBILITY.map((option) => (
            <label key={option.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <input type="radio" name="visibility" value={option.value} checked={tree.visibility === option.value} className="w-4 h-4 text-blue-600" onChange={() => {}} />
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {option.value === 'private' && 'Only you and collaborators'}
                  {option.value === 'unlisted' && 'Anyone with link can view'}
                  {option.value === 'public' && 'Visible to everyone'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shareable Links</h2>
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Generate a unique link to share your family tree</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Access Level</label>
              <select value={selectedAccessLevel} onChange={(e) => setSelectedAccessLevel(e.target.value as any)} className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500">
                {FAMILY_TREE_ENUMS.ACCESS_LEVELS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <button onClick={() => onCreateLink?.(selectedAccessLevel)} disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium transition-colors flex items-center justify-center">
              <span className="mr-2">🔗</span>
              {isLoading ? 'Generating...' : 'Generate Link'}
            </button>
          </div>
        </div>

        {shareLinks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No links yet. Generate one to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {shareLinks.map((link) => (
              <div key={link.link_id} className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getAccessLevelLabel(link.access_level)}
                  </p>
                  <button onClick={() => onRevokeLink?.(link.link_id)} className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                    Revoke
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="text" readOnly value={`${typeof window !== 'undefined' ? window.location.origin : ''}/public/${link.slug}`} className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white" />
                  <button onClick={() => copyToClipboard(link.slug)} className={`px-3 py-2 rounded text-sm font-medium transition-colors ${copiedLinkId === link.slug ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {copiedLinkId === link.slug ? '✅ Copied' : '📋 Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="text-sm text-gray-600 dark:text-gray-400">People Joined</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
