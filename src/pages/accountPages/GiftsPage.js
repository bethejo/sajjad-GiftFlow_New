import React, { useState } from 'react';
import '../../styles/GiftsPage.css'; 
import { useChild } from '../context/ChildContext';
import ChildList from './ChildList';
import GiftList from './GiftList';
import AddGiftForm from './AddGiftForm';
import EditGiftForm from './EditGiftForm';
import InvetationForom from "../InvetationPages/InvetationForom";

const GiftsPage = () => {
  const { childrenData } = useChild(); 
  const [children, setChildren] = useState(childrenData);
  const [selectedChild, setSelectedChild] = useState(null);
  const [addingGift, setAddingGift] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [invite, setInvitation] = useState(false);
  const [view, setView] = useState('list');
  const [suggestedGifts, setSuggestedGifts] = useState([]);

  const addGift = (childName, gift) => {
    setChildren(children?.map(child => 
      child.name === childName ? { ...child, gifts: [...child.gifts, gift] } : child
    ));
    setAddingGift(false);
    setView('list');
  };

  const deleteGift = (childName, giftId) => {
    setChildren(children?.map(child => 
      child.name === childName 
        ? { ...child, gifts: child.gifts.filter(gift => gift.id !== giftId) }
        : child
    ));
  };

  const updateGift = (childName, updatedGift) => {
    setChildren(children?.map(child => 
      child.name === childName 
        ? { ...child, gifts: child.gifts.map(gift => gift.id === updatedGift.id ? updatedGift : gift) }
        : child
    ));
    setEditingGift(null);
  };

  return (
    <div className="gifts-page">
      <h1 className="page-title">Manage Gifts</h1>
      <div className="page-content">
        <div className="child-list">
          <ChildList children={children} setSelectedChild={setSelectedChild} />
        </div>
        <div className="gift-section">
          {selectedChild && (
            <>
              <div className="view-switcher">
                <button className="btn" onClick={() => setView('add')}>Add Gift</button>
                <button className="btn" onClick={() => setView('addedgifts')}>Child's Gift</button>
                <button className="btn" onClick={() => setView('list')}>Suggesting Gifts</button>
                <button className="btn" onClick={() => setView('list')}>The child will love</button>
              </div>
              {view === 'add' && (
                <AddGiftForm 
                  addGift={addGift} 
                  setAddingGift={setAddingGift} 
                  childName={selectedChild?.name}
                />
              )}

              {
                view === 'addedgifts' && (
                  <GiftList
                    className='gift'
                    gifts={selectedChild?.gifts || []} // Ensure gifts is an array
                    deleteGift={deleteGift} 
                    setEditingGift={setEditingGift} 
                    childName={selectedChild?.name}
                  />
                )
              }

              {view === 'list' && (
                <>
                  {suggestedGifts.length > 0 && (
                    <div className="suggested-gifts">
                      <h3 className='gifts-header'>Suggested Gifts</h3>
                      <GiftList
                        gifts={suggestedGifts}
                        deleteGift={deleteGift}
                        setEditingGift={setEditingGift}
                        childName={selectedChild?.name}
                        isSuggested={true}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {editingGift && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditGiftForm 
              gift={editingGift} 
              updateGift={updateGift} 
              setEditingGift={setEditingGift} 
              childName={selectedChild?.name}
            />
          </div>
        </div>
      )}

      {addingGift && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddGiftForm 
              addGift={addGift} 
              setAddingGift={setAddingGift} 
              childName={selectedChild?.name}
            />
          </div>
        </div>
      )}

      {selectedChild && (
        <div className="invite-section">
          <button className="btn invite-btn" onClick={() => setInvitation(true)}>Invite Friends</button>
        </div>
      )}

      {invite && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InvetationForom 
              listOfGifts={selectedChild.gifts || []} // Ensure gifts is an array
              childName={selectedChild.name} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;