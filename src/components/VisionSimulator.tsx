import React, { useState } from 'react';

type Vision = {
    name: string;
    description: string;
    filter: string;
};

const VisionSimulator: React.FC = () => {
    const [visionType, setVisionType] = useState<'normal' | 'cataract' | 'glaucoma'>('normal');
    const [severity, setSeverity] = useState(0);

    const visions: Record<'normal' | 'cataract' | 'glaucoma', Vision> = {
        normal: {
            name: 'Normal Görüş',
            description: 'Sağlıklı bir gözün net ve keskin görüşü.',
            filter: 'none'
        },
        cataract: {
            name: 'Katarakt',
            description: 'Göz merceğinin saydamlığını kaybetmesi sonucu oluşan genel bulanıklık ve soluk renkler.',
            filter: `blur(${severity / 10}px) contrast(${100 - severity / 2}%) brightness(${100 + severity / 5}%)`
        },
        glaucoma: {
            name: 'Glokom (Göz Tansiyonu)',
            description: 'Göz sinirindeki hasar sonucu çevresel görmenin yavaş yavaş kaybolması (tünel görüşü).',
            filter: `grayscale(${severity / 5}%)`
        }
    };

    const currentVision = visions[visionType];

    return (
        <div className="vision-simulator">
            <div className="simulator-controls">
                <div className="vision-selector">
                    {(Object.keys(visions) as Array<'normal' | 'cataract' | 'glaucoma'>).map((type) => (
                        <button
                            key={type}
                            className={`selector-btn ${visionType === type ? 'active' : ''}`}
                            onClick={() => {
                                setVisionType(type);
                                setSeverity(type === 'normal' ? 0 : 50);
                            }}
                        >
                            {visions[type].name}
                        </button>
                    ))}
                </div>

                <div className="severity-control">
                    <label>Şiddet: %{severity}</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={severity}
                        onChange={(e) => setSeverity(parseInt(e.target.value))}
                        disabled={visionType === 'normal'}
                    />
                </div>

                <div className="vision-info">
                    <p>{currentVision.description}</p>
                </div>
            </div>

            <div className="image-preview">
                <div className="preview-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                        src="https://images.unsplash.com/photo-1510133769163-2729bdcd957c?auto=format&fit=crop&q=80&w=1200"
                        alt="Simülasyon Görüntüsü"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'filter 0.3s ease',
                            filter: visionType !== 'glaucoma' ? currentVision.filter : 'none'
                        }}
                    />
                    {visionType === 'glaucoma' && (
                        <div
                            className="glaucoma-overlay"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                                transition: 'background 0.3s ease',
                                background: `radial-gradient(circle, transparent ${100 - severity}%, black ${150 - severity}%)`
                            }}
                        ></div>
                    )}
                </div>
            </div>

            <style>{`
        .vision-simulator {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: center;
        }

        .simulator-controls {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .vision-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .selector-btn {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-family: inherit;
          transition: all 0.2s ease;
          text-align: left;
        }

        .selector-btn:hover {
          border-color: #0056B3;
          background: #f7fafc;
        }

        .selector-btn.active {
          background: #0056B3;
          color: white;
          border-color: #0056B3;
          box-shadow: 0 4px 6px rgba(0, 86, 179, 0.2);
        }

        .severity-control {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .severity-control label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #4a5568;
        }

        input[type="range"] {
          width: 100%;
          cursor: pointer;
        }

        .vision-info p {
          font-size: 0.95rem;
          color: #718096;
          line-height: 1.5;
        }

        .image-preview {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          aspect-ratio: 16/9;
        }

        @media (max-width: 992px) {
          .vision-simulator {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default VisionSimulator;
