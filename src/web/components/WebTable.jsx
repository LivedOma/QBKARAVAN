import React from 'react';
import { colors } from '../../shared/colors.js';

const WebTable = ({ columns, data }) => (
  <div style={{ 
    backgroundColor: colors.white, 
    borderRadius: 12, 
    overflow: 'hidden', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
  }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: colors.gray50 }}>
          {columns.map((col, i) => (
            <th 
              key={i} 
              style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                fontSize: 12, 
                fontWeight: 600, 
                color: colors.gray600, 
                borderBottom: `1px solid ${colors.gray200}` 
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
            {columns.map((col, j) => (
              <td 
                key={j} 
                style={{ 
                  padding: '12px 16px', 
                  fontSize: 14, 
                  color: colors.gray700 
                }}
              >
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default WebTable;
