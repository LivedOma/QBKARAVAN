import React, { useState } from 'react';
import { Search, QrCode, Menu, Box, Package, Plus } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, color = 'danger' }) => {
  const colorMap = {
    danger: { bg: colors.danger, text: colors.white },
    primary: { bg: colors.primary, text: colors.white },
  };
  const c = colorMap[color];
  return (
    <span style={{
      backgroundColor: c.bg,
      color: c.text,
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 9,
      fontWeight: 600,
      position: 'absolute',
      top: 8,
      right: 8,
    }}>{children}</span>
  );
};

const productosData = [
  { id: 1, code: 'LAC-001', name: 'Leche Entera 1L', category: 'Lácteos', price: 28.50, stock: 156, image: '🥛', promo: false },
  { id: 2, code: 'LAC-002', name: 'Leche Deslactosada 1L', category: 'Lácteos', price: 32.00, stock: 98, image: '🥛', promo: false },
  { id: 3, code: 'LAC-003', name: 'Leche Light 1L', category: 'Lácteos', price: 30.50, stock: 87, image: '🥛', promo: true, promoPrice: 25.00 },
  { id: 4, code: 'YOG-015', name: 'Yogurt Natural 1kg', category: 'Yogurt', price: 45.00, stock: 124, image: '🥄', promo: false },
  { id: 5, code: 'YOG-016', name: 'Yogurt Fresa 1kg', category: 'Yogurt', price: 48.00, stock: 95, image: '🥄', promo: true, promoPrice: 42.00 },
  { id: 6, code: 'YOG-017', name: 'Yogurt Griego 500g', category: 'Yogurt', price: 55.00, stock: 78, image: '🥄', promo: false },
  { id: 7, code: 'QUE-008', name: 'Queso Panela 400g', category: 'Quesos', price: 65.00, stock: 112, image: '🧀', promo: false },
  { id: 8, code: 'QUE-009', name: 'Queso Oaxaca 500g', category: 'Quesos', price: 78.00, stock: 89, image: '🧀', promo: false },
  { id: 9, code: 'QUE-010', name: 'Queso Manchego 400g', category: 'Quesos', price: 95.00, stock: 54, image: '🧀', promo: true, promoPrice: 85.00 },
  { id: 10, code: 'CRE-003', name: 'Crema Ácida 500ml', category: 'Cremas', price: 38.50, stock: 92, image: '🥣', promo: false },
  { id: 11, code: 'CRE-004', name: 'Crema para Batir 1L', category: 'Cremas', price: 58.00, stock: 67, image: '🥣', promo: false },
  { id: 12, code: 'CRE-005', name: 'Crema Vegetal 500ml', category: 'Cremas', price: 35.00, stock: 103, image: '🥣', promo: true, promoPrice: 29.00 },
];

const categories = ['Todos', 'Lácteos', 'Yogurt', 'Quesos', 'Cremas'];

export const CatalogoProductos = ({ onAddProduct, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = productosData.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileFrame title="Catálogo de Productos" showBack onBack={onBack} statusBar={true}>
      <div style={{ padding: 16, paddingBottom: 80 }}>
        {/* Barra de búsqueda */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} color={colors.gray400} style={{ position: 'absolute', left: 12, top: 13 }} />
            <input 
              type="text"
              placeholder="Buscar producto o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
          <button style={{ 
            width: 44, 
            height: 44, 
            borderRadius: 8, 
            backgroundColor: colors.primary, 
            border: 'none', 
            color: colors.white, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <QrCode size={20} />
          </button>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 8, 
              backgroundColor: colors.white, 
              border: `1px solid ${colors.gray300}`, 
              color: colors.gray600, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {viewMode === 'grid' ? <Menu size={20} /> : <Box size={20} />}
          </button>
        </div>

        {/* Filtros de categoría */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                backgroundColor: selectedCategory === cat ? colors.primary : colors.gray100,
                color: selectedCategory === cat ? colors.white : colors.gray600,
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador */}
        <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 12 }}>
          {filteredProducts.length} productos encontrados
        </div>

        {/* Vista Grid */}
        {viewMode === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {filteredProducts.map((prod) => (
              <Card key={prod.id} style={{ padding: 12, position: 'relative' }}>
                {prod.promo && <Badge color="danger">PROMO</Badge>}
                <div style={{ 
                  width: '100%', 
                  height: 80, 
                  backgroundColor: colors.gray50, 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: 40,
                  marginBottom: 8,
                }}>
                  {prod.image}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray800, marginBottom: 4, height: 32, overflow: 'hidden' }}>
                  {prod.name}
                </div>
                <div style={{ fontSize: 10, color: colors.gray500, marginBottom: 6 }}>
                  {prod.code}
                </div>
                {prod.promo ? (
                  <div>
                    <div style={{ fontSize: 10, color: colors.gray400, textDecoration: 'line-through' }}>
                      ${prod.price.toFixed(2)}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: colors.danger }}>
                      ${prod.promoPrice.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray800 }}>
                    ${prod.price.toFixed(2)}
                  </div>
                )}
                <div style={{ fontSize: 10, color: prod.stock < 50 ? colors.warning : colors.gray500, marginTop: 4 }}>
                  Stock: {prod.stock}
                </div>
                <button 
                  onClick={() => onAddProduct(prod)}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    padding: '8px',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <Plus size={14} /> Agregar
                </button>
              </Card>
            ))}
          </div>
        )}

        {/* Vista Lista */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredProducts.map((prod) => (
              <Card key={prod.id} style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ 
                    width: 60, 
                    height: 60, 
                    backgroundColor: colors.gray50, 
                    borderRadius: 8, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}>
                    {prod.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                        {prod.name}
                      </div>
                      {prod.promo && <Badge color="danger">PROMO</Badge>}
                    </div>
                    <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>
                      {prod.code} • Stock: {prod.stock}
                    </div>
                    {prod.promo ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, color: colors.gray400, textDecoration: 'line-through' }}>
                          ${prod.price.toFixed(2)}
                        </span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: colors.danger }}>
                          ${prod.promoPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray800 }}>
                        ${prod.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onAddProduct(prod)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: colors.primary,
                      color: colors.white,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Plus size={14} /> Agregar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Package size={48} color={colors.gray300} />
            <div style={{ fontSize: 14, color: colors.gray500, marginTop: 12 }}>
              No se encontraron productos
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
};
