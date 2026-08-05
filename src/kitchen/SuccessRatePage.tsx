import React from 'react';
import { ChevronLeft, Star, CheckCircle2, Award, Zap, ShieldCheck, ThumbsUp } from 'lucide-react';

interface SuccessRatePageProps {
  onBack: () => void;
}

export const SuccessRatePage: React.FC<SuccessRatePageProps> = ({ onBack }) => {
  const overallScore = 94;

  const metrics = [
    { title: 'Fee Collection Efficiency', score: '92%', status: 'Excellent', description: 'Percentage of resident dues collected on time every month.', icon: Zap, color: '#16a34a', bg: '#dcfce7' },
    { title: 'Complaint Resolution Speed', score: '96%', status: 'Outstanding', description: 'Average response and resolution within 24 hours of logging.', icon: CheckCircle2, color: '#2563eb', bg: '#dbeafe' },
    { title: 'Hostel Occupancy Level', score: '88%', status: 'High Performance', description: 'Bed occupancy rate across 1st, 2nd, and 3rd floors.', icon: ShieldCheck, color: '#7c3aed', bg: '#f3e8ff' },
    { title: 'Staff Attendance & Punctuality', score: '98%', status: 'Top Rated', description: 'Staff presence and duty completion rate for warden, cook & staff.', icon: Award, color: '#0891b2', bg: '#cffaff' },
    { title: 'Food & Mess Satisfaction', score: '4.8 / 5', status: 'Guest Favorite', description: 'Resident feedback and mess menu quality rating.', icon: ThumbsUp, color: '#ea580c', bg: '#ffedd5' },
  ];

  return (
    <div className="srp-page-container">
      {/* HEADER */}
      <div className="srp-header-bar">
        
        <h1 className="srp-header-title">Performance & Success Rate</h1>
      </div>

      {/* OVERALL HERO SCORE CARD */}
      <div className="srp-hero-card">
        <div className="srp-hero-badge">
          <Star size={18} fill="#f59e0b" color="#f59e0b" />
          <span>GOLD STANDARD HOSTEL</span>
        </div>
        <div className="srp-hero-score">{overallScore}%</div>
        <div className="srp-hero-title">Overall Operational Success Rate</div>
        <div className="srp-hero-sub">Based on July 2026 key performance indicators and resident satisfaction</div>
      </div>

      {/* DETAILED METRICS SECTION */}
      <div className="srp-section-title">KEY PERFORMANCE INDICATORS</div>

      <div className="srp-metrics-list">
        {metrics.map(metric => {
          const IconComp = metric.icon;
          return (
            <div key={metric.title} className="srp-metric-card">
              <div className="srp-metric-top">
                <div className="srp-icon-box" style={{ background: metric.bg, color: metric.color }}>
                  <IconComp size={22} />
                </div>
                <div className="srp-metric-titles">
                  <h3 className="srp-metric-name">{metric.title}</h3>
                  <span className="srp-metric-status" style={{ color: metric.color }}>{metric.status}</span>
                </div>
                <div className="srp-metric-score" style={{ color: metric.color }}>{metric.score}</div>
              </div>

              <p className="srp-metric-desc">{metric.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
