import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Users, 
  ChevronUp, 
  Building,
  DoorOpen
} from 'lucide-react';

export interface Member {
  id: string;
  name: string;
  roomNumber: string;
  block: 'Block A' | 'Block B' | 'Block C';
  mobile: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

export const initialMembersData: Member[] = [
  {
    id: 'm1',
    name: 'Vijay Sai',
    roomNumber: '101',
    block: 'Block A',
    mobile: '9876543210',
    initials: 'VS',
    avatarBg: '#f3e8ff',
    avatarColor: '#a855f7'
  },
  {
    id: 'm2',
    name: 'Rohit Arjun',
    roomNumber: '102',
    block: 'Block A',
    mobile: '9123456780',
    initials: 'RA',
    avatarBg: '#fef3c7',
    avatarColor: '#d97706'
  },
  {
    id: 'm3',
    name: 'Pranathi Sharma',
    roomNumber: '201',
    block: 'Block B',
    mobile: '9988776655',
    initials: 'PS',
    avatarBg: '#dcfce7',
    avatarColor: '#16a34a'
  },
  {
    id: 'm4',
    name: 'Ankit Kumar',
    roomNumber: '202',
    block: 'Block B',
    mobile: '9032109876',
    initials: 'AK',
    avatarBg: '#ffe4e6',
    avatarColor: '#e11d48'
  },
  {
    id: 'm5',
    name: 'Sai Meghana',
    roomNumber: '301',
    block: 'Block C',
    mobile: '9654781236',
    initials: 'SM',
    avatarBg: '#e0f2fe',
    avatarColor: '#0284c7'
  },
  {
    id: 'm6',
    name: 'Vikram Reddy',
    roomNumber: '103',
    block: 'Block A',
    mobile: '9848022338',
    initials: 'VR',
    avatarBg: '#e0e7ff',
    avatarColor: '#4f46e5'
  },
  {
    id: 'm7',
    name: 'Divya Teja',
    roomNumber: '203',
    block: 'Block B',
    mobile: '9700112233',
    initials: 'DT',
    avatarBg: '#fff7ed',
    avatarColor: '#ea580c'
  },
  {
    id: 'm8',
    name: 'Rahul Verma',
    roomNumber: '302',
    block: 'Block C',
    mobile: '9898989898',
    initials: 'RV',
    avatarBg: '#fce7f3',
    avatarColor: '#db2777'
  }
];

interface SelectMembersPanelProps {
  selectedMemberIds: string[];
  onToggleMember: (id: string) => void;
  onClearAll: () => void;
  onSelectAll?: (ids: string[]) => void;
  onDone: () => void;
  onClosePanel?: () => void;
}

export const SelectMembersPanel: React.FC<SelectMembersPanelProps> = ({
  selectedMemberIds,
  onToggleMember,
  onClearAll,
  onSelectAll,
  onDone,
  onClosePanel
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
    <div className="select-members-panel">
      {/* Panel Header */}
      <div className="members-panel-header">
        <div className="members-panel-header-left">
          <div className="members-header-icon-box">
            <Users size={16} color="#2563eb" />
          </div>
          <span className="members-panel-title">Specific Members</span>
        </div>
        <button 
          type="button" 
          className="panel-collapse-btn" 
          onClick={onClosePanel || onDone}
          aria-label="Collapse panel"
        >
          <ChevronUp size={18} />
        </button>
      </div>

      <div className="members-panel-body">
        {/* Instruction Subtext */}
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
          <div className="members-cards-list">
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
          <div className="members-grouped-list">
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
                        if (onSelectAll) {
                          const roomIds = membersInRoom.map(m => m.id);
                          if (allRoomSelected) {
                            // deselect room
                            const remaining = selectedMemberIds.filter(id => !roomIds.includes(id));
                            if (onClearAll) onClearAll();
                            remaining.forEach(id => onToggleMember(id));
                          } else {
                            // select room
                            const toAdd = roomIds.filter(id => !selectedMemberIds.includes(id));
                            toAdd.forEach(id => onToggleMember(id));
                          }
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
          <div className="members-grouped-list">
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

        {/* Bottom Bar: Selection Count & Actions */}
        <div className="members-panel-footer">
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
  );
};

export default SelectMembersPanel;
