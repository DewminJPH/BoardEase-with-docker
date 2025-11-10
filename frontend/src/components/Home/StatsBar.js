import React from 'react';
import './StatsBar.css';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home11Icon,AddTeamIcon,CommentAdd01Icon,MedalFirstPlaceIcon } from '@hugeicons/core-free-icons';

const StatsBar = ({ stats,theme='light' }) => {
  // Defining a functional component named StatsBar that accepts props:
  // - stats: an array of statistic objects (with number and label properties)
  // - theme: a string with default value 'light' if not provided

  const iconConfig = [
    // Creating a configuration array for icons with their properties
    {icon: Home11Icon, size: 50, color: '#113E21'},
    // First icon configuration: Home icon with size and color
    {icon: AddTeamIcon, size: 50, color: '#113E21'},
    {icon: CommentAdd01Icon, size: 50, color: '#113E21'},
    {icon: MedalFirstPlaceIcon, size: 50, color: '#113E21'}
  ];

  return (
    <div className={`stats-bar ${theme}`}>
      {/* Main container div with dynamic className based on theme prop */}
      {stats.map((item, index) => (
        // Mapping through the stats array to create a stat item for each entry
        // Using index as key (acceptable here since list is static)
        <div key={index} className="stat-item">
          <div className="stat-header">
            <HugeiconsIcon 
              icon={iconConfig[index].icon} 
              size={30} 
              color={iconConfig[index % iconConfig.length].color}
              strokeWidth={1.5}
              className="stat-icon"
            />
            <div className="stat-number">{item.number}</div>
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

StatsBar.defaultProps = {
  stats: [
    { number: '#1', label: 'Website Rank' },
    { number: '50,000+', label: 'Feedbacks' },
    { number: '1,000+', label: 'Listings' },
    { number: '259K', label: 'Monthly Visitors' }
  ],
};

export default StatsBar;