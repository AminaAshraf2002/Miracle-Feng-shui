'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, categories } from '@/lib/placeholder-data';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const initialForm: Omit<Product, 'id'> = {
    name: '',
    maker: 'Miracle Feng Shui Studio',
    price: 999,
    originalPrice: 1499,
    discount: '33% off',
    bestseller: false,
    etsyPick: false,
    freeShipping: true,
    rating: 5,
    reviewCount: 1,
    category: 'Feng Shui Decor',
    images: ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'],
    description: '',
    itemDetails: ['Handcrafted with authentic sacred blessing', 'Purified with sandalwood incense before delivery'],
  };

  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialForm);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      maker: prod.maker || 'Miracle Feng Shui Studio',
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      discount: prod.discount || '',
      bestseller: !!prod.bestseller,
      etsyPick: !!prod.etsyPick,
      freeShipping: !!prod.freeShipping,
      rating: prod.rating || 5,
      reviewCount: prod.reviewCount || 1,
      category: prod.category || 'Feng Shui Decor',
      images: prod.images?.length ? prod.images : ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'],
      description: prod.description || '',
      itemDetails: prod.itemDetails?.length ? prod.itemDetails : ['Temple blessed authentic talisman'],
    });
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      showToast('Product updated successfully!');
    } else {
      addProduct(formData);
      showToast('New product added to catalog!');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    showToast('Product deleted from catalog.');
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.maker.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#133E35] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/20">
          <i className="fa-solid fa-circle-check text-emerald-400 text-lg" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#A84218] uppercase tracking-wider">
            <i className="fa-solid fa-box-open" />
            <span>Store Catalog &amp; Inventory</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            Products Management ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Add new items, modify pricing and discounts, or curate bestsellers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset products list to default catalog items?')) {
                resetProducts();
                showToast('Products reset to defaults.');
              }
            }}
            className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-rotate-left mr-1.5" />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="bg-[#A84218] hover:bg-[#8F3510] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by product title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218] focus:ring-2 focus:ring-[#A84218]/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="w-full sm:w-60 shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#A84218]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Item (Image + Title) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <span className="font-semibold text-gray-900 block truncate text-sm">
                            {prod.name}
                          </span>
                          <span className="text-[11px] text-gray-400 block truncate">
                            {prod.maker} • ★ {prod.rating} ({prod.reviewCount})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-gray-600 text-xs font-medium">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-lg">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-gray-900 text-sm">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {prod.discount && (
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          {prod.discount}
                        </span>
                      )}
                    </td>

                    {/* Badges Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { bestseller: !prod.bestseller })
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-colors cursor-pointer ${
                            prod.bestseller
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          Bestseller
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { etsyPick: !prod.etsyPick })
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border transition-colors cursor-pointer ${
                            prod.etsyPick
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          Miracle Pick
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(prod)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <i className="fa-solid fa-pen text-xs" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <i className="fa-solid fa-trash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 my-8 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <span className="text-xs text-gray-400">
                  {editingProduct ? `Modifying ID: ${editingProduct.id}` : 'Fill in the talisman & cure specifications'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Blessed Cinnabar Bracelet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                />
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.originalPrice || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Discount Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 30% off"
                    value={formData.discount || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                  />
                </div>
              </div>

              {/* Category & Shop Maker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#A84218]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Shop / Maker Name
                  </label>
                  <input
                    type="text"
                    value={formData.maker}
                    onChange={(e) =>
                      setFormData({ ...formData, maker: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Image URL *
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.images[0] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, images: [e.target.value] })
                    }
                    className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                  />
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={formData.images[0] || ''}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Blessed by Taoist masters to invite continuous wealth and good fortune..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
                />
              </div>

              {/* Badges Toggles */}
              <div className="flex items-center gap-6 pt-1 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) =>
                      setFormData({ ...formData, bestseller: e.target.checked })
                    }
                    className="w-4 h-4 rounded-md border-gray-300 text-[#A84218] focus:ring-[#A84218]"
                  />
                  <span>Bestseller Tag</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.etsyPick}
                    onChange={(e) =>
                      setFormData({ ...formData, etsyPick: e.target.checked })
                    }
                    className="w-4 h-4 rounded-md border-gray-300 text-[#A84218] focus:ring-[#A84218]"
                  />
                  <span>Miracle Pick Tag</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.freeShipping}
                    onChange={(e) =>
                      setFormData({ ...formData, freeShipping: e.target.checked })
                    }
                    className="w-4 h-4 rounded-md border-gray-300 text-[#A84218] focus:ring-[#A84218]"
                  />
                  <span>Free Delivery</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#A84218] hover:bg-[#8F3510] text-white rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <i className="fa-solid fa-triangle-exclamation text-lg" />
            </div>
            <h3 className="font-bold text-center text-gray-900 text-base">
              Delete Product?
            </h3>
            <p className="text-xs text-center text-gray-500">
              Are you sure you want to remove this product? It will no longer appear on the shop or homepage.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
