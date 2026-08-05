import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  ChevronDown, 
  IndianRupee, 
  Box, 
  Sparkles,
  ShoppingBag,
  Layers
} from 'lucide-react';
import type { PantryItem } from '../types';

interface UpdateStockPageProps {
  pantryItems: PantryItem[];
  initialItemId?: string | null;
  onBack: () => void;
  onSaveStock: (itemId: string, quantityToAdd: number, totalCost: number) => void;
}

export const UpdateStockPage: React.FC<UpdateStockPageProps> = ({
  pantryItems,
  initialItemId,
  onBack,
  onSaveStock
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialItemId && pantryItems.some(i => i.id === initialItemId)
      ? initialItemId
      : (pantryItems[0]?.id || '')
  );

  const selectedItem = pantryItems.find(i => i.id === selectedId) || pantryItems[0];

  const [addQuantity, setAddQuantity] = useState<string>('');
  const [totalCost, setTotalCost] = useState<string>('');
  const [isCostCustom, setIsCostCustom] = useState<boolean>(false);

  useEffect(() => {
    if (selectedItem && !isCostCustom) {
      const q = parseFloat(addQuantity) || 0;
      setTotalCost(q > 0 ? (q * selectedItem.price).toString() : '');
    }
  }, [addQuantity, selectedItem, isCostCustom]);

  const handleItemSelectChange = (id: string) => {
    setSelectedId(id);
    setIsCostCustom(false);
  };

  const handleQuantityChange = (val: string) => {
    setAddQuantity(val);
    if (!isCostCustom && selectedItem) {
      const q = parseFloat(val) || 0;
      setTotalCost(q > 0 ? (q * selectedItem.price).toString() : '');
    }
  };

  const handleCostChange = (val: string) => {
    setTotalCost(val);
    setIsCostCustom(true);
  };

  const qtyToAddNum = parseFloat(addQuantity) || 0;
  const currentStock = selectedItem ? selectedItem.stock : 0;
  const updatedTotalStock = currentStock + qtyToAddNum;
  const computedCost = parseFloat(totalCost) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || qtyToAddNum <= 0) {
      alert('Please enter a valid stock quantity to add.');
      return;
    }
    onSaveStock(selectedItem.id, qtyToAddNum, computedCost);
  };

  const isFromTopButton = !initialItemId;

  return (
    <div className="usp-page-container">
      <style>{`
        .usp-page-container {
          background: #f8fafc;
          min-height: 100vh;
          padding: 16px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }

        .usp-input[type=number]::-webkit-inner-spin-button,
        .usp-input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .usp-input[type=number] {
          -moz-appearance: textfield;
        }

        .usp-form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .usp-form-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .usp-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .usp-form-title {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
        }

        .usp-form-subtitle {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }

        .usp-field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .usp-field-label {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          display: flex;
          align-items: center;
        }

        .usp-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .usp-input-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .usp-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border-radius: 12px;
          border: 1.5px solid #cbd5e1;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .usp-input:focus {
          border-color: #059669;
          background: #ffffff;
          box-shadow: 0 0 0 3.5px rgba(5, 150, 105, 0.12);
        }

        .usp-select {
          width: 100%;
          padding: 12px 38px 12px 42px;
          border-radius: 12px;
          border: 1.5px solid #cbd5e1;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .usp-select:focus {
          border-color: #059669;
          background: #ffffff;
          box-shadow: 0 0 0 3.5px rgba(5, 150, 105, 0.12);
        }

        .usp-select-arrow {
          position: absolute;
          right: 14px;
          color: #64748b;
          pointer-events: none;
        }

        .usp-current-stock-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px 16px;
          border-radius: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .usp-current-stock-label {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .usp-current-stock-val {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .usp-updated-stock-box {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border: 1.5px solid #bfdbfe;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .usp-updated-stock-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .usp-updated-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #ffffff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(37, 99, 235, 0.15);
        }

        .usp-updated-label {
          font-size: 11px;
          font-weight: 800;
          color: #1e40af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .usp-updated-sub {
          font-size: 11px;
          color: #3b82f6;
          font-weight: 600;
        }

        .usp-updated-val {
          font-size: 18px;
          font-weight: 800;
          color: #1d4ed8;
          font-family: 'Outfit', sans-serif;
        }

        .usp-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 6px;
        }

        .usp-btn-cancel {
          padding: 13px;
          border-radius: 12px;
          border: 1.5px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        .usp-btn-cancel:hover {
          background: #f1f5f9;
        }

        .usp-btn-submit {
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
          transition: all 0.2s ease;
        }
        .usp-btn-submit:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
      `}</style>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit}>
        <div className="usp-form-card">

          <div className="usp-form-header">
            <div className="usp-icon-badge">
              <Plus size={24} />
            </div>
            <div>
              <div className="usp-form-title">
                {isFromTopButton ? 'Add Stock to Pantry' : `Update Stock: ${selectedItem?.name}`}
              </div>
              <div className="usp-form-subtitle">
                {selectedItem ? `Unit Price: ₹${selectedItem.price} / ${selectedItem.unit}` : 'Select item & enter quantity to add'}
              </div>
            </div>
          </div>

          {/* ITEM SELECTOR DROPDOWN (Only shown when opened from top action button) */}
          {isFromTopButton && (
            <div className="usp-field-group">
              <label className="usp-field-label">Select Pantry Item</label>
              <div className="usp-input-wrap">
                <ShoppingBag size={16} className="usp-input-icon" />
                <select
                  className="usp-select"
                  value={selectedId}
                  onChange={(e) => handleItemSelectChange(e.target.value)}
                >
                  {pantryItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Current: {item.stock} {item.unit})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="usp-select-arrow" />
              </div>
            </div>
          )}

          {/* CURRENT STOCK DISPLAY BOX */}
          {selectedItem && (
            <div className="usp-current-stock-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="#64748b" />
                <span className="usp-current-stock-label">Current Stock</span>
              </div>
              <span className="usp-current-stock-val">
                {selectedItem.stock} {selectedItem.unit}
              </span>
            </div>
          )}

          {/* STOCK AMOUNT TO ADD */}
          <div className="usp-field-group">
            <label className="usp-field-label">
              Stock Adding Now ({selectedItem?.unit || 'qty'})
            </label>
            <div className="usp-input-wrap">
              <Box size={16} className="usp-input-icon" />
              <input
                type="number"
                min="1"
                required
                placeholder="e.g. 5"
                className="usp-input"
                value={addQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>
          </div>

          {/* TOTAL COST / AMOUNT FOR ADDED STOCK */}
          <div className="usp-field-group">
            <label className="usp-field-label">
              Total Amount / Cost (₹)
            </label>
            <div className="usp-input-wrap">
              <IndianRupee size={16} className="usp-input-icon" />
              <input
                type="number"
                min="0"
                placeholder="e.g. 300"
                className="usp-input"
                value={totalCost}
                onChange={(e) => handleCostChange(e.target.value)}
              />
            </div>
            {selectedItem && qtyToAddNum > 0 && (
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginLeft: '4px' }}>
                Auto calculated: {qtyToAddNum} {selectedItem.unit} × ₹{selectedItem.price} = ₹{qtyToAddNum * selectedItem.price}
              </span>
            )}
          </div>

          {/* UPDATED TOTAL STOCK SUMMARY CARD */}
          {selectedItem && (
            <div className="usp-updated-stock-box">
              <div className="usp-updated-stock-left">
                <div className="usp-updated-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="usp-updated-label">Updated Total Stock</div>
                  <div className="usp-updated-sub">
                    {selectedItem.stock} + {qtyToAddNum} = {updatedTotalStock} {selectedItem.unit}
                  </div>
                </div>
              </div>
              <div className="usp-updated-val">
                {updatedTotalStock} {selectedItem.unit}
              </div>
            </div>
          )}

          {/* FORM ACTIONS */}
          <div className="usp-actions-grid">
            <button type="button" className="usp-btn-cancel" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="usp-btn-submit">
              <CheckCircle2 size={16} />
              <span>Save Stock</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
