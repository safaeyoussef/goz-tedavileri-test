import React, { useState } from 'react';

const DistortionGrid: React.FC = () => {
    const [distortionAreas, setDistortionAreas] = useState<number[]>([]);

    const handleClick = (i: number) => {
        if (distortionAreas.includes(i)) {
            setDistortionAreas(distortionAreas.filter(a => a !== i));
        } else {
            setDistortionAreas([...distortionAreas, i]);
        }
    };

    return (
        <div className="module-distortion">
            <div className="module-header">
                <h3>Distorsiyon Ağı (Amsler)</h3>
                <p>Merkez noktaya bakarken ızgara çizgilerinde dalgalanma veya kopukluk olan bölgeleri işaretleyin.</p>
            </div>

            <div className="grid-display glass">
                <div className="amsler-container">
                    <div className="amsler-grid">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div
                                key={i}
                                className={`grid-cell ${distortionAreas.includes(i) ? 'flagged' : ''}`}
                                onClick={() => handleClick(i)}
                            />
                        ))}
                        <div className="center-dot" />
                    </div>
                </div>

                <div className="grid-controls">
                    <div className="legend">
                        <div className="legend-item">
                            <span className="box flagged" />
                            <span>Tespit Edilen Bölge</span>
                        </div>
                    </div>
                    <button className="btn-reset" onClick={() => setDistortionAreas([])}>Sıfırla</button>

                    <div className="pro-tip">
                        <strong>Talimat:</strong> Tek gözünüzü kapatın ve merkezdeki siyah noktaya odaklanın. Çizgilerde bir bozulma görürseniz o alana tıklayın.
                    </div>
                </div>
            </div>

            <style>{`
                .module-distortion {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .module-header h3 {
                    font-size: 1.8rem;
                    margin: 0;
                    color: #fbbf24;
                }

                .grid-display {
                    flex: 1;
                    display: grid;
                    grid-template-columns: 1fr 250px;
                    gap: 2rem;
                    background: #f8fafc;
                    border-radius: 24px;
                    padding: 2rem;
                    color: black;
                }

                .amsler-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .amsler-grid {
                    display: grid;
                    grid-template-columns: repeat(20, 1fr);
                    width: 400px;
                    height: 400px;
                    border: 1px solid #ddd;
                    position: relative;
                }

                .grid-cell {
                    border: 0.5px solid #eee;
                    cursor: crosshair;
                }

                .grid-cell:hover {
                    background: rgba(251, 191, 36, 0.1);
                }

                .grid-cell.flagged {
                    background: #fbbf24;
                }

                .center-dot {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: black;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }

                .grid-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding-top: 1rem;
                }

                .btn-reset {
                    background: #ef4444;
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 700;
                }

                .box {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    margin-right: 0.5rem;
                    border-radius: 4px;
                }

                .box.flagged { background: #fbbf24; }

                .pro-tip {
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: #475569;
                    background: #f1f5f9;
                    padding: 1rem;
                    border-radius: 12px;
                }
            `}</style>
        </div>
    );
};

export default DistortionGrid;
