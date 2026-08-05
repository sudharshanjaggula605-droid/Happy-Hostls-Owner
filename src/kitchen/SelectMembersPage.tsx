import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Users, 
  Building,
  DoorOpen,
  ArrowLeft
} from 'lucide-react';
import { initialMembersData } from './SelectMembersPanel';
import type { Member } from './SelectMembersPanel';

interface SelectMembersPageProps {
  selectedMemberIds: string[];
  onToggleMember: (id: string) => void;
  onClearAll: () => void;
  onDone: () => void;
  onBack: () => void;
}

export const SelectMembersPage: React.FC<SelectMembersPageProps> = ({
  selectedMemberIds,
  onToggleMember,
  onClearAll,
  onDone,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'room' | 'block'>('all');

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return initialMembersData;
    return initialMembersData.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.mobile.includes(query) ||
      m.roomNumber.toLowerCase().includes(query) ||
      m.block.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group members room wise
  const roomGroups = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    filteredMembers.forEach(m => {
      const key = `Room ${m.roomNumber} (${m.block})`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return groups;
  }, [filteredMembers]);

  // Group members block wise
  const blockGroups = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    filteredMembers.forEach(m => {
      if (!groups[m.block]) groups[m.block] = [];
      groups[m.block].push(m);
    });
    return groups;
  }, [filteredMembers]);

  return (
    <div className="select-members-fullpage-container">
      {/* Top Banner / Card Title */}
      <div className="select-members-page-card">
        {/* Header Bar inside Card */}
        <div className="fullpage-card-header">
          

          <div className="fullpage-title-box">
            <div className="members-header-icon-box">
              <Users size={16} color="#2563eb" />
            </div>
            <span className="fullpage-card-title">Specific Members</span>
          </div>

          <div style={{ width: '24px' }} />
        </div>

        <div className="fullpage-card-body">
          {/* Instruction Text */}
          <div className="select-instruction-text">
            Select members to send this message
          </div>

          {/* Search Bar */}
          <div className="member-search-box">
            <Search size={14} className="search-icon-muted" />
            <input 
              type="text"
              className="member-search-input"
              placeholder="Search by name, mobile number or room number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sub-Tabs Row */}
          <div className="member-subtabs-row">
            <button 
              type="button"
              className={`member-subtab-btn ${activeSubTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('all')}
            >
              All Members ({filteredMembers.length})
            </button>

            <button 
              type="button"
              className={`member-subtab-btn ${activeSubTab === 'room' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('room')}
            >
              Room Wise
            </button>

            <button 
              type="button"
              className={`member-subtab-btn ${activeSubTab === 'block' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('block')}
            >
              Block Wise
            </button>
          </div>

          {/* TAB 1: ALL MEMBERS LIST */}
          {activeSubTab === 'all' && (
            <div className="fullpage-members-list">
              {filteredMembers.length === 0 ? (
                <div className="no-members-msg">No members found matching "{searchQuery}"</div>
              ) : (
                filteredMembers.map((member) => {
                  const isSelected = selectedMemberIds.includes(member.id);
                  return (
                    <div 
                      key={member.id} 
                      className={`member-item-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => onToggleMember(member.id)}
                    >
                      <div className="member-item-left">
                        {/* Checkbox */}
                        <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                        </div>

                        {/* Avatar */}
                        <div 
                          className="member-avatar"
                          style={{ backgroundColor: member.avatarBg, color: member.avatarColor }}
                        >
                          {member.initials}
                        </div>

                        {/* Name & Room Details */}
                        <div className="member-details">
                          <div className="member-name">{member.name}</div>
                          <div className="member-subinfo">Room {member.roomNumber} • {member.block}</div>
                        </div>
                      </div>

                      {/* Right Mobile Number */}
                      <div className="member-mobile-text">{member.mobile}</div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: ROOM WISE LIST */}
          {activeSubTab === 'room' && (
            <div className="fullpage-members-list">
              {Object.keys(roomGroups).map((roomName) => {
                const membersInRoom = roomGroups[roomName];
                const allRoomSelected = membersInRoom.every(m => selectedMemberIds.includes(m.id));
                
                return (
                  <div key={roomName} className="group-card">
                    <div className="group-card-header">
                      <div className="group-header-left">
                        <DoorOpen size={15} color="#2563eb" />
                        <span className="group-title">{roomName}</span>
                      </div>
                      <button 
                        type="button" 
                        className="group-select-all-btn"
                        onClick={() => {
                          const roomIds = membersInRoom.map(m => m.id);
                          if (allRoomSelected) {
                            const remaining = selectedMemberIds.filter(id => !roomIds.includes(id));
                            onClearAll();
                            remaining.forEach(id => onToggleMember(id));
                          } else {
                            const toAdd = roomIds.filter(id => !selectedMemberIds.includes(id));
                            toAdd.forEach(id => onToggleMember(id));
                          }
                        }}
                      >
                        {allRoomSelected ? 'Deselect Room' : 'Select Room'}
                      </button>
                    </div>

                    {membersInRoom.map(member => {
                      const isSelected = selectedMemberIds.includes(member.id);
                      return (
                        <div 
                          key={member.id} 
                          className={`member-item-row ${isSelected ? 'selected' : ''}`}
                          onClick={() => onToggleMember(member.id)}
                        >
                          <div className="member-item-left">
                            <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                              {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                            </div>
                            <div 
                              className="member-avatar"
                              style={{ backgroundColor: member.avatarBg, color: member.avatarColor }}
                            >
                              {member.initials}
                            </div>
                            <div className="member-details">
                              <div className="member-name">{member.name}</div>
                              <div className="member-subinfo">{member.mobile}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: BLOCK WISE LIST */}
          {activeSubTab === 'block' && (
            <div className="fullpage-members-list">
              {Object.keys(blockGroups).map((blockName) => {
                const membersInBlock = blockGroups[blockName];
                const allBlockSelected = membersInBlock.every(m => selectedMemberIds.includes(m.id));

                return (
                  <div key={blockName} className="group-card">
                    <div className="group-card-header">
                      <div className="group-header-left">
                        <Building size={15} color="#2563eb" />
                        <span className="group-title">{blockName} ({membersInBlock.length} Members)</span>
                      </div>
                      <button 
                        type="button" 
                        className="group-select-all-btn"
                        onClick={() => {
                          const blockIds = membersInBlock.map(m => m.id);
                          if (allBlockSelected) {
                            const remaining = selectedMemberIds.filter(id => !blockIds.includes(id));
                            onClearAll();
                            remaining.forEach(id => onToggleMember(id));
                          } else {
                            const toAdd = blockIds.filter(id => !selectedMemberIds.includes(id));
                            toAdd.forEach(id => onToggleMember(id));
                          }
                        }}
                      >
                        {allBlockSelected ? 'Deselect Block' : 'Select Block'}
                      </button>
                    </div>

                    {membersInBlock.map(member => {
                      const isSelected = selectedMemberIds.includes(member.id);
                      return (
                        <div 
                          key={member.id} 
                          className={`member-item-row ${isSelected ? 'selected' : ''}`}
                          onClick={() => onToggleMember(member.id)}
                        >
                          <div className="member-item-left">
                            <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                              {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                            </div>
                            <div 
                              className="member-avatar"
                              style={{ backgroundColor: member.avatarBg, color: member.avatarColor }}
                            >
                              {member.initials}
                            </div>
                            <div className="member-details">
                              <div className="member-name">{member.name}</div>
                              <div className="member-subinfo">Room {member.roomNumber} • {member.mobile}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sticky Bottom Bar */}
          <div className="fullpage-members-footer">
            <span className="selection-count-text">
              {selectedMemberIds.length} {selectedMemberIds.length === 1 ? 'member' : 'members'} selected
            </span>

            <div className="footer-actions-right">
              {selectedMemberIds.length > 0 && (
                <button 
                  type="button" 
                  className="clear-all-link-btn"
                  onClick={onClearAll}
                >
                  Clear All
                </button>
              )}

              <button 
                type="button"
                className="apply-members-btn"
                onClick={onDone}
              >
                Done &amp; Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectMembersPage;
