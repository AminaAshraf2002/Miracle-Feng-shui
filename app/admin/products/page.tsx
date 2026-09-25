'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Product, categories } from '@/lib/placeholder-data';
import ImageUploadField from '@/components/admin/ImageUploadField';



export default function AdminProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    refreshProducts,
    categories: storeCategories,
  } = useStore();
  const availableCategories = storeCategories && storeCategories.length > 0 ? storeCategories : categories;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // CSV Export & Import States
  const [isExporting, setIsExporting] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<Array<{
    title: string;
    category: string;
    price: string;
    stock: string;
    isValid: boolean;
    error?: string;
  }>>([]);
  const [updateExistingOnImport, setUpdateExistingOnImport] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importStats, setImportStats] = useState<{
    totalProcessed: number;
    createdCount: number;
    updatedCount: number;
    errors: Array<{ row: number; title?: string; message: string }>;
  } | null>(null);

  // Read URL query parameter if redirected from banner search
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Form State
  const initialForm: Omit<Product, 'id'> = {
    name: '',
    maker: 'Miracle Feng Shui Studio',
    price: 999,
    originalPrice: 1499,
    discount: '33% off',
    stock: 50,
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

  const [selectedStockFilter, setSelectedStockFilter] = useState<'All' | 'Low' | 'OutOfStock' | 'InStock'>('All');
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialForm);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to upload image');
      }

      setFormData((prev) => ({
        ...prev,
        images: [result.data.url, ...(prev.images || []).slice(1)],
      }));
      showToast('Image uploaded successfully!');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('/api/admin/products/export');
      if (!res.ok) throw new Error('Failed to download CSV');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `miracle-feng-shui-products-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Catalog exported to CSV successfully!');
    } catch (err: any) {
      showToast(err.message || 'CSV export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
    setImportStats(null);

    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length <= 1) {
        showToast('CSV file is empty or only has headers');
        return;
      }

      // Quick preview parser for the first 8 rows
      const parsed: Array<{
        title: string;
        category: string;
        price: string;
        stock: string;
        isValid: boolean;
        error?: string;
      }> = [];

      const headerLine = lines[0].toLowerCase();
      const headers = headerLine.split(',').map((h) => h.replace(/["']/g, '').trim());
      const titleIdx = headers.findIndex((h) => h === 'title' || h === 'name');
      const catIdx = headers.findIndex((h) => h === 'category');
      const priceIdx = headers.findIndex((h) => h === 'price');
      const stockIdx = headers.findIndex((h) => h === 'stock');

      for (let i = 1; i < Math.min(lines.length, 9); i++) {
        const rowText = lines[i];
        const matches = rowText.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rowText.split(',');
        const cleanValues = matches.map((m) => m.replace(/^"|"$/g, '').trim());

        const title = titleIdx !== -1 ? cleanValues[titleIdx] : cleanValues[1] || cleanValues[0];
        const category = catIdx !== -1 ? cleanValues[catIdx] : cleanValues[2] || 'Feng Shui Decor';
        const price = priceIdx !== -1 ? cleanValues[priceIdx] : cleanValues[3] || '';
        const stock = stockIdx !== -1 ? cleanValues[stockIdx] : cleanValues[5] || '50';

        const numPrice = parseFloat(price);
        const isValid = Boolean(title && !isNaN(numPrice) && numPrice > 0);
        const error = !title
          ? 'Missing title'
          : isNaN(numPrice) || numPrice <= 0
          ? 'Invalid price'
          : undefined;

        parsed.push({
          title: title || 'Untitled',
          category: category || 'Feng Shui Decor',
          price: price || '0',
          stock: stock || '50',
          isValid,
          error,
        });
      }

      setPreviewRows(parsed);
    } catch {
      showToast('Error parsing preview from CSV file');
    }
  };

  const handleRunImport = async () => {
    if (!csvFile) {
      showToast('Please choose a CSV file first');
      return;
    }

    setIsImporting(true);
    setImportStats(null);
    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      formData.append('updateExisting', updateExistingOnImport ? 'true' : 'false');

      const res = await fetch('/api/admin/products/import', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to import CSV');
      }

      setImportStats(result.data);
      await refreshProducts();
      showToast(`Import finished! ${result.data.createdCount} created, ${result.data.updatedCount} updated.`);
    } catch (err: any) {
      showToast(err.message || 'Import failed');
    } finally {
      setIsImporting(false);
    }
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
      stock: prod.stock !== undefined ? prod.stock : 50,
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

  // Filter products by category, search query, and stock level
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.maker.toLowerCase().includes(searchQuery.toLowerCase());

      const stockVal = p.stock !== undefined ? p.stock : 50;
      let matchesStock = true;
      if (selectedStockFilter === 'Low') {
        matchesStock = stockVal > 0 && stockVal < 10;
      } else if (selectedStockFilter === 'OutOfStock') {
        matchesStock = stockVal === 0;
      } else if (selectedStockFilter === 'InStock') {
        matchesStock = stockVal >= 10;
      }

      return matchesCategory && matchesSearch && matchesStock;
    });
  }, [products, selectedCategory, searchQuery, selectedStockFilter]);

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="flex flex-col gap-6"
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
          <i className="fa-solid fa-circle-check text-emerald-400 text-base" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Luxury Noir Salon-Style Hero Page Banner with Right-Side Fade Image */}
      <div className="rounded-3xl bg-[#161619] p-6 sm:p-8 text-white shadow-xl border border-white/10 relative overflow-hidden flex flex-col justify-between gap-6 min-h-[190px]">
        {/* Right-Side Photo with Seamless Noir Blend Gradient (matching reference screenshot) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none">
          <img
            src="/images/feng_shui_hero_banner.jpg"
            alt="Miracle Products Sanctuary"
            className="w-full h-full object-cover object-right brightness-[0.7] contrast-[1.08]"
          />
          {/* Seamless Left Fade Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #161619 0%, #161619 12%, rgba(22, 22, 25, 0.85) 42%, rgba(22, 22, 25, 0.25) 75%, transparent 100%)',
            }}
          />
          {/* Subtle Top & Bottom Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(22, 22, 25, 0.35) 0%, transparent 25%, transparent 75%, rgba(22, 22, 25, 0.5) 100%)',
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            {/* Date Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-[10.5px] font-mono tracking-[0.16em] uppercase font-semibold mb-2.5 shadow-2xs backdrop-blur-xs">
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).toUpperCase()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1
              style={{ fontFamily: "'Bebas Neue', 'Montserrat', sans-serif" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight"
            >
              Products Management ({products.length})
            </h1>
            <p
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl font-normal leading-relaxed"
            >
              Add new sacred artifacts, adjust stock levels &amp; pricing, and orchestrate collections.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={openAddModal}
              style={{ backgroundColor: '#FFFFFF', color: '#111111' }}
              className="text-black text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md hover:bg-gray-100 cursor-pointer inline-flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-xs text-black" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Quick Toolbar Bar with Glass Effect */}
        <div className="pt-3 border-t border-white/10 relative z-10 flex items-center gap-2 flex-wrap text-xs">
          <a
            href="/api/admin/products/sample-csv"
            download="miracle-feng-shui-sample-template.csv"
            className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white font-medium transition-all no-underline shadow-2xs flex items-center gap-1.5"
            title="Download formatted sample template CSV"
          >
            <i className="fa-solid fa-file-arrow-down text-gray-300 text-xs" />
            <span>Sample CSV</span>
          </a>

          <button
            type="button"
            onClick={handleExportCsv}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <i className={isExporting ? 'fa-solid fa-spinner fa-spin text-gray-300' : 'fa-solid fa-file-export text-gray-300'} />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setImportModalOpen(true);
              setCsvFile(null);
              setPreviewRows([]);
              setImportStats(null);
            }}
            className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-file-import text-gray-300" />
            <span>Import CSV</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset products list to default catalog items?')) {
                resetProducts();
                showToast('Products reset to defaults.');
              }
            }}
            className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-rose-950/40 text-white/80 hover:text-white font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-rotate-left text-xs" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/admin/categories"
            className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white font-medium transition-all shadow-2xs no-underline flex items-center gap-1.5"
          >
            <i className="fa-solid fa-tags text-gray-300 text-xs" />
            <span>Categories</span>
          </Link>
        </div>
      </div>


      {/* Inventory & Stock Overview Cards - Wink Luxury Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <button
          type="button"
          onClick={() => setSelectedStockFilter('All')}
          style={selectedStockFilter === 'All' ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' } : { backgroundColor: '#ffffff', color: '#111827', borderColor: '#E5E7EB' }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
            selectedStockFilter === 'All'
              ? 'bg-[#040404] text-white border-[#040404]'
              : 'bg-white border-gray-200 hover:border-gray-400 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10.5px] font-bold uppercase tracking-wider ${selectedStockFilter === 'All' ? 'text-gray-300' : 'text-gray-500'}`}>
              Total Catalog
            </span>
            <i className={`fa-solid fa-boxes-stacked text-xs ${selectedStockFilter === 'All' ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="text-2xl font-bold">{products.length}</div>
          <p className={`text-[11px] mt-0.5 ${selectedStockFilter === 'All' ? 'text-gray-300' : 'text-gray-400'}`}>
            Active products in store
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStockFilter('InStock')}
          style={selectedStockFilter === 'InStock' ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' } : { backgroundColor: '#ffffff', color: '#111827', borderColor: '#E5E7EB' }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
            selectedStockFilter === 'InStock'
              ? 'bg-[#040404] text-white border-[#040404]'
              : 'bg-white border-gray-200 hover:border-emerald-300 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10.5px] font-bold uppercase tracking-wider ${selectedStockFilter === 'InStock' ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Healthy Stock (&ge;10)
            </span>
            <i className={`fa-solid fa-circle-check text-xs ${selectedStockFilter === 'InStock' ? 'text-emerald-300' : 'text-emerald-500'}`} />
          </div>
          <div className="text-2xl font-bold">
            {products.filter((p) => (p.stock !== undefined ? p.stock : 50) >= 10).length}
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStockFilter === 'InStock' ? 'text-gray-300' : 'text-gray-400'}`}>
            Optimal fulfillment ready
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStockFilter('Low')}
          style={selectedStockFilter === 'Low' ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' } : { backgroundColor: '#ffffff', color: '#111827', borderColor: '#E5E7EB' }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
            selectedStockFilter === 'Low'
              ? 'bg-[#040404] text-white border-[#040404]'
              : 'bg-white border-gray-200 hover:border-gray-400 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10.5px] font-bold uppercase tracking-wider ${selectedStockFilter === 'Low' ? 'text-white' : 'text-gray-700'}`}>
              Low Stock (&lt;10 Left)
            </span>
            <span className={`w-2 h-2 rounded-full ${selectedStockFilter === 'Low' ? 'bg-white' : 'bg-gray-600'}`} />
          </div>
          <div className="text-2xl font-bold">
            {
              products.filter((p) => {
                const s = p.stock !== undefined ? p.stock : 50;
                return s > 0 && s < 10;
              }).length
            }
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStockFilter === 'Low' ? 'text-gray-300' : 'text-gray-400'}`}>
            Urgency badges live on store
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStockFilter('OutOfStock')}
          style={selectedStockFilter === 'OutOfStock' ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' } : { backgroundColor: '#ffffff', color: '#111827', borderColor: '#E5E7EB' }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
            selectedStockFilter === 'OutOfStock'
              ? 'bg-[#040404] text-white border-[#040404]'
              : 'bg-white border-gray-200 hover:border-rose-300 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10.5px] font-bold uppercase tracking-wider ${selectedStockFilter === 'OutOfStock' ? 'text-rose-300' : 'text-rose-700'}`}>
              Out of Stock (0)
            </span>
            <i className={`fa-solid fa-triangle-exclamation text-xs ${selectedStockFilter === 'OutOfStock' ? 'text-rose-300' : 'text-rose-500'}`} />
          </div>
          <div className="text-2xl font-bold">
            {products.filter((p) => (p.stock !== undefined ? p.stock : 50) === 0).length}
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStockFilter === 'OutOfStock' ? 'text-rose-200' : 'text-gray-400'}`}>
            Purchases paused for item
          </p>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by product title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5"
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

        {/* Stock Filter Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['All', 'InStock', 'Low', 'OutOfStock'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedStockFilter(filter)}
              style={
                selectedStockFilter === filter
                  ? { backgroundColor: '#040404', color: '#ffffff' }
                  : { backgroundColor: '#ffffff', color: '#374151' }
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedStockFilter === filter
                  ? 'bg-[#040404] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter === 'All' && 'All Items'}
              {filter === 'InStock' && 'In Stock (≥10)'}
              {filter === 'Low' && 'Low Stock (<10)'}
              {filter === 'OutOfStock' && 'Out of Stock (0)'}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="w-full sm:w-44 shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs font-semibold rounded-full border border-gray-200 bg-white text-gray-700 focus:outline-hidden focus:border-black cursor-pointer"
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden w-full">
        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed text-left text-xs">
            <colgroup>
              <col className="w-[36%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
            </colgroup>
            <thead className="bg-gray-50/80 text-gray-500 text-[10px] uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-2.5 px-3">Item</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2">Price</th>
                <th className="py-2.5 px-2">Stock Level</th>
                <th className="py-2.5 px-2">Badges</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Item (Image + Title) */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
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
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 block truncate text-xs" title={prod.name}>
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-gray-400 block truncate">
                            {prod.maker} • ★ {prod.rating}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-2 px-2">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-[10.5px] font-medium text-gray-700 block truncate text-center" title={prod.category}>
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-2 px-2">
                      <div className="font-bold text-gray-900 text-xs truncate">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                      {prod.originalPrice && (
                        <div className="text-[9.5px] text-gray-400 line-through truncate">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                      {prod.discount && (
                        <div className="text-[9px] text-emerald-600 font-semibold truncate">
                          {prod.discount}
                        </div>
                      )}
                    </td>

                    {/* Stock Level */}
                    <td className="py-2 px-2">
                      {prod.stock === 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Out
                        </span>
                      ) : prod.stock !== undefined && prod.stock < 10 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 border border-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse" />
                          Low: {prod.stock}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {prod.stock ?? 50} in stock
                        </span>
                      )}
                    </td>

                    {/* Badges Toggle */}
                    <td className="py-2 px-2">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { bestseller: !prod.bestseller })
                          }
                          style={
                            prod.bestseller
                              ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' }
                              : { backgroundColor: '#F3F4F6', color: '#6B7280', borderColor: '#E5E7EB' }
                          }
                          className={`text-[9.5px] px-2 py-0.5 rounded-full font-semibold border transition-colors cursor-pointer ${
                            prod.bestseller
                              ? 'bg-[#040404] text-white border-[#040404]'
                              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          Bestseller
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { etsyPick: !prod.etsyPick })
                          }
                          style={
                            prod.etsyPick
                              ? { backgroundColor: '#040404', color: '#ffffff', borderColor: '#040404' }
                              : { backgroundColor: '#F3F4F6', color: '#6B7280', borderColor: '#E5E7EB' }
                          }
                          className={`text-[9.5px] px-2 py-0.5 rounded-full font-semibold border transition-colors cursor-pointer ${
                            prod.etsyPick
                              ? 'bg-[#040404] text-white border-[#040404]'
                              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          Miracle Pick
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <i className="fa-solid fa-pen text-xs" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8 sm:my-10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
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
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
                />
              </div>

              {/* Price, Original Price, Discount & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
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
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
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
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
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
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                    <span>Stock Level *</span>
                    <span className="text-[10px] text-gray-500 font-normal">&lt;10 alerts store</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.stock !== undefined ? formData.stock : 50}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
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
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-black"
                  >
                    {availableCategories.filter((c) => c !== 'All').map((c) => (
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
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              {/* Product Image Upload */}
              <div>
                <ImageUploadField
                  label="Product Image"
                  required
                  value={formData.images[0] || ''}
                  onChange={(url) => setFormData({ ...formData, images: [url] })}
                  helpText="Upload product image file (PNG, JPG, or WEBP)."
                />
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
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-black"
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
                    className="w-4 h-4 rounded-md border-gray-300 text-black focus:ring-black"
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
                    className="w-4 h-4 rounded-md border-gray-300 text-black focus:ring-black"
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
                    className="w-4 h-4 rounded-md border-gray-300 text-black focus:ring-black"
                  />
                  <span>Free Delivery</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#040404', color: '#ffffff' }}
                  className="px-6 py-2.5 text-xs font-semibold bg-[#040404] hover:bg-black text-white rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <span>{editingProduct ? 'Update Product' : 'Add to Catalog'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200/50 shadow-2xs">
              <i className="fa-solid fa-trash text-sm" />
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
                className="px-5 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                style={{ backgroundColor: '#DC2626', color: '#ffffff' }}
                className="px-6 py-2.5 text-xs font-semibold hover:bg-rose-700 text-white rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk CSV Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-gray-100 flex flex-col gap-4 my-8 sm:my-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg border border-emerald-200/50">
                  <i className="fa-solid fa-file-csv" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                    Bulk Product CSV Import
                  </h2>
                  <p className="text-xs text-gray-500">
                    Upload a CSV file to add or update multiple catalog products at once.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            {/* Template Advice Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 text-xs text-emerald-900">
                <i className="fa-solid fa-circle-info text-emerald-600 text-sm" />
                <span>
                  Make sure your CSV contains columns like <strong>title</strong>, <strong>price</strong>, <strong>category</strong>, and <strong>stock</strong>.
                </span>
              </div>
              <a
                href="/api/admin/products/sample-csv"
                download="miracle-feng-shui-sample-template.csv"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 shadow-2xs shrink-0 no-underline cursor-pointer"
              >
                <i className="fa-solid fa-download text-emerald-600" />
                <span>Download Sample CSV</span>
              </a>
            </div>

            {/* Drag and Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl p-6 sm:p-8 text-center transition-all bg-gray-50/50 relative">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shadow-2xs">
                  <i className="fa-solid fa-cloud-arrow-up" />
                </div>
                {csvFile ? (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-gray-900">{csvFile.name}</span>
                    <span className="text-xs text-gray-500">
                      {(csvFile.size / 1024).toFixed(1)} KB • Click or drag another file to replace
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      Click to choose CSV or drag &amp; drop file here
                    </p>
                    <span className="text-[11px] text-gray-500">
                      Supports comma-separated values (.csv) with standard headers
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Parsed Rows Preview */}
            {previewRows.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700">
                    Preview (First {previewRows.length} rows detected)
                  </span>
                  <span className="text-gray-500">
                    {previewRows.filter((r) => r.isValid).length} ready to import
                  </span>
                </div>
                <div className="max-h-44 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-100/70 text-gray-600 sticky top-0">
                      <tr>
                        <th className="p-2 font-semibold">Title</th>
                        <th className="p-2 font-semibold">Category</th>
                        <th className="p-2 font-semibold">Price</th>
                        <th className="p-2 font-semibold">Stock</th>
                        <th className="p-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                      {previewRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/80">
                          <td className="p-2 font-medium truncate max-w-[180px]" title={row.title}>
                            {row.title}
                          </td>
                          <td className="p-2 text-gray-600">{row.category}</td>
                          <td className="p-2 font-semibold">₹{row.price}</td>
                          <td className="p-2 text-gray-600">{row.stock}</td>
                          <td className="p-2">
                            {row.isValid ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <i className="fa-solid fa-check text-[10px]" /> Valid
                              </span>
                            ) : (
                              <span
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200"
                                title={row.error}
                              >
                                <i className="fa-solid fa-triangle-exclamation text-[10px]" /> {row.error}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="flex items-center justify-between py-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={updateExistingOnImport}
                  onChange={(e) => setUpdateExistingOnImport(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span>Update existing items if product ID matches database record</span>
              </label>
            </div>

            {/* Summary Report after Import */}
            {importStats && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                  <i className="fa-solid fa-square-poll-vertical text-emerald-600 text-sm" />
                  <span>Import Summary Report</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                    <span className="text-gray-500 block text-[11px]">Total Rows</span>
                    <span className="text-base font-bold text-gray-900">{importStats.totalProcessed}</span>
                  </div>
                  <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
                    <span className="text-emerald-700 block text-[11px]">Created (New)</span>
                    <span className="text-base font-bold text-emerald-800">+{importStats.createdCount}</span>
                  </div>
                  <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-200">
                    <span className="text-blue-700 block text-[11px]">Updated</span>
                    <span className="text-base font-bold text-blue-800">{importStats.updatedCount}</span>
                  </div>
                </div>

                {importStats.errors && importStats.errors.length > 0 && (
                  <div className="mt-1 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 max-h-28 overflow-y-auto">
                    <span className="font-bold block mb-1">Row Errors ({importStats.errors.length}):</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {importStats.errors.map((err, i) => (
                        <li key={i}>
                          Row {err.row}: {err.title ? `"${err.title}" - ` : ''}
                          {err.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                {importStats ? 'Done' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleRunImport}
                disabled={!csvFile || isImporting}
                style={{ color: '#ffffff' }}
                className={`px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 ${
                  !csvFile || isImporting
                    ? 'bg-gray-300 !text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 !text-white'
                }`}
              >
                {isImporting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs" style={{ color: '#ffffff' }} />
                    <span style={{ color: '#ffffff' }}>Importing Products...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check text-xs" style={{ color: '#ffffff' }} />
                    <span style={{ color: '#ffffff' }}>Run Bulk Import</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
