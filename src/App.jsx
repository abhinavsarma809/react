import { useState } from 'react';
import './App.css';

function App() {
  const [countVisible, setCountVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState('');


  const toggleCountVisible = () => {
    setCountVisible((prev) => !prev);
  };

  const handleCreateGroup = () => {
    if (groupName && selectedColor) {
      const initials = groupName
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('')
        .slice(0, 2);

      setGroups([...groups, { name: groupName, initials, color: selectedColor, notes: [] }]);
      setGroupName(''); 
      setSelectedColor('');
      setCountVisible(false); 
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
   
  };


  const handleSendNote = () => {
    if (selectedGroup && notes.trim()) {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const updatedGroups = groups.map((group) => {
        if (group.name === selectedGroup.name) {
          return { 
            ...group, 
            notes: [...group.notes, { text: notes, color: 'black', timestamp: formattedDate }] 
          };
        }
        return group;
      });

      const updatedSelectedGroup = {
        ...selectedGroup,
        notes: [...selectedGroup.notes, { text: notes, color: 'black', timestamp: formattedDate }],
      };

      setGroups(updatedGroups);
      setSelectedGroup(updatedSelectedGroup);
      setNotes(''); 
    }
  };

  return (
    <div className="app-container">
      <div className="row">
        <h2 id="note">Pocket Notes</h2>

      
        <div className="group-list">
          {groups.map((group, index) => (
            <div
              className="group-item"
              key={index}
              onClick={() => handleGroupClick(group)}
              style={{
                backgroundColor: selectedGroup && selectedGroup.name === group.name ? 'whitesmoke' : 'transparent',
              }}
            >
              <span className="group-initials" style={{ backgroundColor: group.color }}>
                {group.initials}
              </span>
              <span className="group-fullname"><b>{group.name}</b></span>
            </div>
          ))}
        </div>

    
        <button id="add" onClick={toggleCountVisible}>+</button>
      </div>

      <div className="c2">
        {selectedGroup ? (
          <div className="notepad">
            <div className="group-header">
              <span className="group-initials" style={{ backgroundColor: selectedGroup.color }}>
                {selectedGroup.initials}
              </span>
              <span className="group-fullname"><b>{selectedGroup.name}</b></span>
            </div>

            <div className="note-display">
              {selectedGroup.notes.map((note, index) => (
                <div key={index} className="note-item" style={{ color: note.color }}>
                  <p>{note.text}</p>
                  <small style={{ color: 'gray', fontSize: 'smaller' }}>
                    {note.timestamp}
                  </small>
                </div>
              ))}
            </div>

            <div className="note-input">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type your note here..."
                style={{ color: 'black' }} // Force textarea text color to black
                id="text"
              />
              <button className="send-arrow" onClick={handleSendNote}>→</button>
            </div>
          </div>
        ) : (
          <div className="c2-content">
            <img src="src/Note.png" id="node" alt="Note" />
            <h2 id="poc">Pocket Notes</h2>
            <p id="send">
              <b>Send and receive messages without keeping your phone online.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone</b>
            </p>
          </div>
        )}

        
        {countVisible && (
          <div className="field-2">
            <p id="group">Create New Group<br /></p>
            <label htmlFor="groupName" id="Group">Group Name</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{ color: 'black' }} 
            /><br />

            <p id="colour">Color:</p>
            <div className="displayColor">
              <button id="red" onClick={() => setSelectedColor('red')}></button>
              <button id="blue" onClick={() => setSelectedColor('blue')}></button>
              <button id="yellow" onClick={() => setSelectedColor('yellow')}></button>
              <button id="green" onClick={() => setSelectedColor('paleturquoise')}></button>
              <button id="orange" onClick={() => setSelectedColor('pink')}></button>
            </div>
            <button id="plus" onClick={handleCreateGroup}>Create</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
