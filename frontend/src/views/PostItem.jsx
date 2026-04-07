import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import './PostItem.css';

const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'found',
    title: '',
    category: '',
    location: '',
    description: '',
    verificationQuestion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new item:', formData);
    // In a real app this would call API. We just redirect here.
    navigate('/');
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <h1>Report an Item</h1>
        <p className="subtitle">Did you lose something or find something?</p>
      </div>

      <form className="post-form glass-panel animate-fade-in" onSubmit={handleSubmit}>
        <div className="type-selector">
          <button
            type="button"
            className={`type-btn ${formData.type === 'lost' ? 'active lost' : ''}`}
            onClick={() => setFormData({ ...formData, type: 'lost' })}
          >
            I Lost Something
          </button>
          <button
            type="button"
            className={`type-btn ${formData.type === 'found' ? 'active found' : ''}`}
            onClick={() => setFormData({ ...formData, type: 'found' })}
          >
            I Found Something
          </button>
        </div>

        <div className="form-group">
          <Input
            label="Item Name / Title"
            name="title"
            placeholder="e.g. Apple AirPods Pro"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Category</label>
            <div className="input-wrapper">
              <div className="input-icon"><Tag size={18} /></div>
              <select 
                className="base-input has-icon" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Books">Books/Stationery</option>
                <option value="Bottles">Bottles</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <Input
              label="Location"
              name="location"
              icon={MapPin}
              placeholder="e.g. Library 2nd Floor"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Description</label>
          <textarea
            className="base-input textarea"
            name="description"
            rows="4"
            placeholder="Describe the item in detail..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {formData.type === 'found' && (
          <div className="form-group verification-group">
            <Input
              label="Verification Question (Optional but Recommended)"
              name="verificationQuestion"
              placeholder="e.g. What is the serial number? What's the wallpaper?"
              value={formData.verificationQuestion}
              onChange={handleChange}
            />
            <small className="help-text">Ask a question only the true owner would know.</small>
          </div>
        )}

        <div className="form-group image-upload-group">
          <label className="input-label">Upload Image</label>
          <div className="image-upload-area">
            <Camera size={32} className="upload-icon" />
            <p>Click or drag image to upload</p>
            <span className="upload-hint">Upload a clear photo of the item</span>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="ghost" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg">
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
