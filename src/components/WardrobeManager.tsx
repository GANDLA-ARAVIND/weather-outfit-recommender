import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Shirt } from 'lucide-react';

interface WardrobeItem {
  id: string;
  name: string;
  type: string;
  color: string;
  category: string;
  weatherSuitability?: string;
}

interface WardrobeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onWardrobeUpdate: (items: WardrobeItem[]) => void;
}

const WardrobeManager: React.FC<WardrobeManagerProps> = ({
  isOpen,
  onClose,
  onWardrobeUpdate
}) => {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    color: '',
    category: '',
    weatherSuitability: ''
  });

  const clothingTypes = [
    'T-shirt', 'Shirt', 'Sweater', 'Hoodie', 'Jacket', 'Coat',
    'Jeans', 'Pants', 'Shorts', 'Skirt', 'Dress',
    'Sneakers', 'Boots', 'Sandals', 'Heels',
    'Hat', 'Scarf', 'Gloves', 'Sunglasses'
  ];

  const categories = ['Top', 'Bottom', 'Outerwear', 'Footwear', 'Accessories'];
  const weatherSuitabilities = ['Hot', 'Warm', 'Cool', 'Cold', 'Rainy', 'Windy', 'All Weather'];

  useEffect(() => {
    if (isOpen) {
      loadWardrobeItems();
    }
  }, [isOpen]);

  const loadWardrobeItems = () => {
    const saved = localStorage.getItem('wardrobeItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setWardrobeItems(items);
      } catch (error) {
        console.error('Error loading wardrobe items:', error);
      }
    }
  };

  const saveWardrobeItems = (items: WardrobeItem[]) => {
    localStorage.setItem('wardrobeItems', JSON.stringify(items));
    setWardrobeItems(items);
    onWardrobeUpdate(items);
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.type || !formData.category) return;

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      color: formData.color,
      category: formData.category,
      weatherSuitability: formData.weatherSuitability || undefined
    };

    const updatedItems = [...wardrobeItems, newItem];
    saveWardrobeItems(updatedItems);
    resetForm();
    setIsAddingNew(false);
  };

  const handleEditItem = (item: WardrobeItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      color: item.color,
      category: item.category,
      weatherSuitability: item.weatherSuitability || ''
    });
  };

  const handleUpdateItem = () => {
    if (!editingItem || !formData.name || !formData.type || !formData.category) return;

    const updatedItems = wardrobeItems.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            name: formData.name,
            type: formData.type,
            color: formData.color,
            category: formData.category,
            weatherSuitability: formData.weatherSuitability || undefined
          }
        : item
    );

    saveWardrobeItems(updatedItems);
    resetForm();
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = wardrobeItems.filter(item => item.id !== id);
    saveWardrobeItems(updatedItems);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      color: '',
      category: '',
      weatherSuitability: ''
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shirt className="w-6 h-6 text-blue-500" />
            Manage MyWardrobe
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add New Item Button */}
          {!isAddingNew && !editingItem && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              Add New Item
            </button>
          )}

          {/* Add/Edit Form */}
          {(isAddingNew || editingItem) && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Blue Denim Jacket"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {clothingTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g., Blue, Red, Black"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weather Suitability (Optional)
                  </label>
                  <select
                    value={formData.weatherSuitability}
                    onChange={(e) => setFormData({ ...formData, weatherSuitability: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any weather</option>
                    {weatherSuitabilities.map(weather => (
                      <option key={weather} value={weather}>{weather}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Wardrobe Items List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Wardrobe ({wardrobeItems.length} items)
            </h3>
            
            {wardrobeItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Shirt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No items in your wardrobe yet.</p>
                <p className="text-sm">Add some items to get personalized outfit suggestions!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wardrobeItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <p><span className="font-medium">Type:</span> {item.type}</p>
                      {item.color && <p><span className="font-medium">Color:</span> {item.color}</p>}
                      <p><span className="font-medium">Category:</span> {item.category}</p>
                      {item.weatherSuitability && (
                        <p><span className="font-medium">Weather:</span> {item.weatherSuitability}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeManager;