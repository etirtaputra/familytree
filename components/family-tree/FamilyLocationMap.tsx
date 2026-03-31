'use client';

import React, { useMemo } from 'react';
import { Person, Location } from '@/types/familyTree';

interface FamilyLocationMapProps {
  persons: Person[];
  locations: Location[];
  onLocationClick?: (location: Location) => void;
}

export const FamilyLocationMap: React.FC<FamilyLocationMapProps> = ({ persons, locations, onLocationClick }) => {
  const locationStats = useMemo(() => {
    const stats = new Map<string, { location: Location; count: number; persons: Person[] }>();
    locations.forEach((loc) => {
      stats.set(loc.location_id, {
        location: loc,
        count: persons.filter((p) => p.location_id === loc.location_id).length,
        persons: persons.filter((p) => p.location_id === loc.location_id),
      });
    });
    return Array.from(stats.values()).sort((a, b) => b.count - a.count);
  }, [persons, locations]);

  const locationsByCountry = useMemo(() => {
    const grouped = new Map<string, typeof locationStats>();
    locationStats.forEach((stat) => {
      const country = stat.location.country;
      if (!grouped.has(country)) grouped.set(country, []);
      grouped.get(country)!.push(stat);
    });
    return Array.from(grouped.entries());
  }, [locationStats]);

  return (
    <div className="w-full space-y-6">
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">📍 Interactive Map</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Map integration (Leaflet/Mapbox) coming soon</p>
        </div>
      </div>

      {locationStats.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No locations assigned yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {locationsByCountry.map(([country, countryLocations]) => (
            <div key={country}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 text-sm font-bold">
                  {countryLocations.length}
                </span>
                {country}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryLocations.map((stat) => (
                  <div key={stat.location.location_id} onClick={() => onLocationClick?.(stat.location)} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{stat.location.city}</h4>
                        {stat.location.state_province && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.location.state_province}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {stat.count}
                      </div>
                    </div>
                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {stat.persons.map((person) => (
                        <div key={person.person_id} className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="mr-2">👤</span>
                          <span className="font-medium">{person.first_name} {person.last_name || ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
