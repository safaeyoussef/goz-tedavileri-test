import React, { useState } from 'react';

const RealitySimulator: React.FC = () => {
    const [condition, setCondition] = useState<string>('normal');
    const [intensity, setIntensity] = useState(50);

    const conditions = [
        { id: 'normal', name: 'Normal', desc: 'Sağlıklı görüş' },
        { id: 'cataract', name: 'Katarakt', desc: 'Bulanık ve puslu görüş' },
        { id: 'glaucoma', name: 'Glokom', desc: 'Tünel görüşü ve çevre kaybı' },
        { id: 'astigmatism', name: 'Astigmatizma', desc: 'Işıklarda dağılma ve uzama' },
        { id: 'myopia', name: 'Miyopi', desc: 'Uzak nesnelerde bulanıklık' },
    ];

    const getFilters = () => {
        switch (condition) {
            case 'cataract': return `blur(${intensity / 10}px) contrast(${100 - intensity / 2}%) sepia(${intensity / 5}%)`;
            case 'astigmatism': return `blur(${intensity / 25}px) brightness(${100 + intensity / 2}%)`;
            case 'myopia': return `blur(${intensity / 8}px)`;
            default: return 'none';
        }
    };

    return (
        <div className="module-simulator">
            <div className="module-header">
                <h3>Gerçeklik Simülatörü</h3>
                <p>Farklı göz koşullarının dünyayı nasıl değiştirdiğini interaktif olarak keşfedin.</p>
            </div>

            <div className="simulator-grid">
                <div className="preview-area">
                    <div className="image-stack">
                        <img
                            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200"
                            alt="City View"
                            style={{ filter: getFilters() }}
                        />
                        {condition === 'glaucoma' && (
                            <div className="glaucoma-vignette" style={{
                                background: `radial-gradient(circle, transparent ${100 - intensity}%, black ${150 - intensity}%)`
                            }} />
                        )}
                        {condition === 'astigmatism' && intensity > 20 && (
                            <div className="starburst-overlay" style={{ opacity: intensity / 100 }} />
                        )}
                    </div>
                </div>

                <div className="control-area">
                    <div className="condition-buttons">
                        {conditions.map(c => (
                            <button
                                key={c.id}
                                className={`cond-btn ${condition === c.id ? 'active' : ''}`}
                                onClick={() => setCondition(c.id)}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>

                    <div className="intensity-slider">
                        <div className="slider-label">
                            <span>Şiddet</span>
                            <span>%{intensity}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            disabled={condition === 'normal'}
                        />
                    </div>

                    <div className="condition-info">
                        <strong>Bilgi:</strong>
                        <p>{conditions.find(c => c.id === condition)?.desc}</p>
                    </div>
                </div>
            </div>

            <style>{`
                .module-simulator {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .module-header h3 {
                    font-size: 1.8rem;
                    margin: 0;
                    color: #4ade80;
                }

                .module-header p {
                    color: rgba(255, 255, 255, 0.6);
                    margin: 0.5rem 0 0;
                }

                .simulator-grid {
                    display: grid;
                    grid-template-columns: 1fr 280px;
                    gap: 2rem;
                    flex: 1;
                }

                .preview-area {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: black;
                }

                .image-stack {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .image-stack img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: filter 0.3s;
                }

                .glaucoma-vignette {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    transition: background 0.3s;
                }

                .starburst-overlay {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background-image: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 100%);
                    mix-blend-mode: color-dodge;
                }

                .control-area {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 20px;
                }

                .condition-buttons {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                }

                .cond-btn {
                    padding: 0.75rem;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .cond-btn:hover {
                    background: rgba(255,255,255,0.1);
                }

                .cond-btn.active {
                    background: #4ade80;
                    color: #0f172a;
                    border-color: #4ade80;
                }

                .intensity-slider {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .slider-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .condition-info {
                    font-size: 0.85rem;
                    padding: 1rem;
                    background: rgba(74, 222, 128, 0.1);
                    border-radius: 12px;
                    border-left: 4px solid #4ade80;
                }

                .condition-info p {
                    margin: 0.25rem 0 0;
                    color: rgba(255,255,255,0.8);
                }
            `}</style>
        </div>
    );
};

export default RealitySimulator;
