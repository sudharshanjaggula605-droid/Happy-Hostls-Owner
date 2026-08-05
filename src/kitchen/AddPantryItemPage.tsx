import React, { useState } from 'react';
import { 
  Utensils, 
  CheckCircle2, 
  ChevronDown, 
  IndianRupee, 
  Box, 
  AlertTriangle, 
  Truck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import type { Supplier, PantryItem } from '../types';

interface AddPantryItemPageProps {
  suppliers: Supplier[];
  onBack: () => void;
  onAddItem: (newItem: Omit<PantryItem, 'id'>) => void;
}

export const AddPantryItemPage: React.FC<AddPantryItemPageProps> = ({
  suppliers,
  onBack,
  onAddItem
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [threshold, setThreshold] = useState('20');
  const [supplier, setSupplier] = useState(suppliers[0]?.name || '');

  const numPrice = parseFloat(price) || 0;
  const numStock = parseFloat(stock) || 0;
  const totalCalculated = numPrice * numStock;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !stock || !threshold) {
      alert('Please fill in all required pantry fields.');
      return;
    }

    onAddItem({
      name: name.trim(),
      unit: 'kg',
      price: numPrice,
      stock: numStock,
      threshold: parseFloat(threshold),
      supplier: supplier || suppliers[0]?.name || 'General Supplier'
    });
  };

  return (
    <div className="api-page-container">
      <style>{`
        .api-page-container {
          background: #f8fafc;
          min-height: 100vh;
          padding: 16px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }

        /* Hide Number Input Spinners */
        .api-input[type=number]::-webkit-inner-spin-button,
        .api-input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .api-input[type=number] {
          -moz-appearance: textfield;
        }

        .api-header-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .api-back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 8px 14px;
          border-radius: 12px;
          color: #2563eb;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        .api-back-btn:hover {
          background: #eff6ff;
        }

        .api-header-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .api-form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .api-form-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .api-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .api-form-title {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
        }

        .api-form-subtitle {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }

        .api-field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .api-field-label {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          min-height: 16px;
          display: flex;
          align-items: center;
        }

        .api-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .api-input-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .api-input {
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

        .api-input:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.12);
        }

        .api-select {
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

        .api-select:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.12);
        }

        .api-select-arrow {
          position: absolute;
          right: 14px;
          color: #64748b;
          pointer-events: none;
        }

        .api-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .api-total-card {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border: 1.5px solid #bfdbfe;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .api-total-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .api-total-icon-box {
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

        .api-total-title {
          font-size: 11px;
          font-weight: 800;
          color: #1e40af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .api-total-sub {
          font-size: 11px;
          color: #3b82f6;
          font-weight: 600;
        }

        .api-total-value {
          font-size: 18px;
          font-weight: 800;
          color: #1d4ed8;
          font-family: 'Outfit', sans-serif;
        }

        .api-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 6px;
        }

        .api-btn-cancel {
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
        .api-btn-cancel:hover {
          background: #f1f5f9;
        }

        .api-btn-submit {
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          transition: all 0.2s ease;
        }
        .api-btn-submit:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
      `}</style>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit}>
        <div className="api-form-card">
          
          <div className="api-form-header">
            <div className="api-icon-badge">
              <Utensils size={22} />
            </div>
            <div>
              <div className="api-form-title">Add New Pantry Item</div>
              <div className="api-form-subtitle">Enter item details to update kitchen inventory</div>
            </div>
          </div>

          {/* ITEM NAME */}
          <div className="api-field-group">
            <label className="api-field-label">Item Name</label>
            <div className="api-input-wrap">
              <ShoppingBag size={16} className="api-input-icon" />
              <input
                type="text"
                required
                placeholder="e.g. Amul Milk, Fresh Eggs, Rice"
                className="api-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* UNIT PRICE & INITIAL STOCK */}
          <div className="api-grid-2col">
            <div className="api-field-group">
              <label className="api-field-label">Unit Price (₹)</label>
              <div className="api-input-wrap">
                <IndianRupee size={16} className="api-input-icon" />
                <input
                  type="number"
                  required
                  placeholder="60"
                  className="api-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="api-field-group">
              <label className="api-field-label">Initial Stock</label>
              <div className="api-input-wrap">
                <Box size={16} className="api-input-icon" />
                <input
                  type="number"
                  required
                  placeholder="10"
                  className="api-input"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* LOW STOCK ALERT THRESHOLD & SUPPLIER DROPDOWN */}
          <div className="api-grid-2col">
            <div className="api-field-group">
              <label className="api-field-label">Alert Threshold</label>
              <div className="api-input-wrap">
                <AlertTriangle size={16} className="api-input-icon" />
                <input
                  type="number"
                  required
                  placeholder="20"
                  className="api-input"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </div>
            </div>
            <div className="api-field-group">
              <label className="api-field-label">Supplier</label>
              <div className="api-input-wrap">
                <Truck size={16} className="api-input-icon" />
                <select
                  className="api-select"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                >
                  <option value="">Select Supplier...</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="api-select-arrow" />
              </div>
            </div>
          </div>

          {/* AUTOMATIC TOTAL CALCULATED CARD */}
          <div className="api-total-card">
            <div className="api-total-left">
              <div className="api-total-icon-box">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="api-total-title">Total Estimated Value</div>
                <div className="api-total-sub">Unit Price × Initial Stock</div>
              </div>
            </div>
            <div className="api-total-value">
              ₹{totalCalculated.toLocaleString('en-IN')}
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="api-actions-grid">
            <button type="button" className="api-btn-cancel" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="api-btn-submit">
              <CheckCircle2 size={16} />
              <span>Add Item</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
