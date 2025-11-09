(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        
        .mermaid-output-wrapper {
            margin: 10px 0;
            padding: 10px;
            background-color: transparent; 
            position: relative;
        }
        
        .mermaid-controls {
            text-align: right;
            margin-top: 10px;
            display: flex; 
            justify-content: flex-end; 
            gap: 10px; 
            flex-wrap: wrap; 
        }


        .mermaid-controls button {

            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: none;
            background: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);


            color: #666;
            background-color: transparent;
            border: 1.5px solid #d0d0d0;
        }


        .mermaid-controls button:hover {
            background-color: #f5f5f5;
            border-color: #999;
            transform: scale(1.03);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .mermaid-controls button:active {
            transform: scale(0.98);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .mermaid-controls button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.4);
            border-color: #4299e1;
        }


        .mermaid-controls button svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
            flex-shrink: 0;
        }

        /* Success state for copy button */
        .mermaid-controls button.success {
            color: #22c55e;
            border-color: #22c55e;
            background-color: rgba(34, 197, 94, 0.08);
        }
        .mermaid-controls button.success:hover {
            transform: scale(1.03);
            box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
            border-color: #22c55e;
            background-color: rgba(34, 197, 94, 0.08);
        }


        body.dark-theme .mermaid-output-wrapper {
            background-color: transparent;
        }
        body.dark-theme .mermaid-controls button {
            color: #aaa;
            background-color: transparent;
            border-color: #555;
        }
        body.dark-theme .mermaid-controls button:hover {
            background-color: rgba(255, 255, 255, 0.08);
            border-color: #777;
            transform: scale(1.03);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        body.dark-theme .mermaid-controls button:active {
            transform: scale(0.98);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        body.dark-theme .mermaid-controls button:focus {
            box-shadow: 0 0 0 3px rgba(100, 150, 250, 0.4);
            border-color: #6496fa;
        }
        body.dark-theme .mermaid-controls button.success {
            color: #4ade80;
            border-color: #4ade80;
            background-color: rgba(74, 222, 128, 0.12);
        }
        body.dark-theme .mermaid-controls button.success:hover {
            transform: scale(1.03);
            box-shadow: 0 2px 8px rgba(74, 222, 128, 0.25);
            border-color: #4ade80;
            background-color: rgba(74, 222, 128, 0.12);
        }

        
        .mermaid-rendered-diagram {
            padding: 15px;
            background-color: transparent;
            max-width: 100%;
            height: auto;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;
        }
        .mermaid-rendered-diagram svg {
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .original-mermaid-code {
            background-color: #f8f8f8;
            border: 1px solid #e0e0e0;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-x: auto;
            color: #333;
            font-size: 0.9em;
        }
        body.dark-theme .original-mermaid-code {
            background-color: #282828;
            border-color: #444;
            color: #eee;
        }

        /* Error display styles */
        .mermaid-error-box {
            background-color: #fee;
            border: 2px solid #f33;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            color: #c33;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .mermaid-error-title {
            font-weight: 600;
            font-size: 1em;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .mermaid-error-title svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }
        .mermaid-error-message {
            font-family: monospace;
            font-size: 0.9em;
            background-color: rgba(255, 255, 255, 0.5);
            padding: 10px;
            border-radius: 4px;
            margin: 8px 0;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .mermaid-error-actions {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }
        .mermaid-error-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: none;
            background: #f33;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85em;
            font-weight: 500;
            transition: background-color 0.2s ease;
        }
        .mermaid-error-button:hover {
            background-color: #e22;
        }
        .mermaid-error-button:active {
            background-color: #d11;
        }
        body.dark-theme .mermaid-error-box {
            background-color: #3d1a1a;
            border-color: #d44;
            color: #faa;
        }
        body.dark-theme .mermaid-error-message {
            background-color: rgba(0, 0, 0, 0.3);
        }

        /* Modal/Lightbox styles */
        .mermaid-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.65);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: zoom-out;
        }
        .mermaid-modal-overlay.show {
            opacity: 1;
        }

        .mermaid-modal {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            max-width: 90vw;
            max-height: 90vh;
            width: 90vw;
            height: 90vh;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            cursor: default;
        }
        .mermaid-modal-overlay.show .mermaid-modal {
            transform: scale(1);
        }
        body.dark-theme .mermaid-modal {
            background-color: #1e1e1e;
        }

        .mermaid-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: none;
            background: rgba(0, 0, 0, 0.5);
            font-size: 24px;
            line-height: 1;
            cursor: pointer;
            color: white;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .mermaid-modal-close:hover {
            background-color: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
        }
        body.dark-theme .mermaid-modal-close {
            background: rgba(255, 255, 255, 0.5);
            color: #333;
        }
        body.dark-theme .mermaid-modal-close:hover {
            background-color: rgba(255, 255, 255, 0.8);
        }

        .mermaid-modal-content {
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
            border-radius: 12px;
            box-sizing: border-box;
        }
        .mermaid-modal-content:active {
            cursor: grabbing;
        }

        .mermaid-modal-content svg {
            max-width: calc(100% - 40px);
            max-height: calc(100% - 40px);
            box-sizing: border-box;
        }

        /* Click hint for diagram in original position */
        .mermaid-rendered-diagram {
            cursor: zoom-in;
            position: relative;
        }
        .mermaid-rendered-diagram::after {
            content: '🔍 点击放大查看';
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.85em;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
        }
        .mermaid-rendered-diagram:hover::after {
            opacity: 1;
        }
        body.dark-theme .mermaid-rendered-diagram::after {
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
        }
    `;
    document.head.appendChild(style);

    const icons = {
        code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
        diagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2 0V4.07c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z"/></svg>', // Simple circle for diagram
        download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
        copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
        check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
        reset: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>'
    };

    function openMermaidModal(svgContent, mermaidCode) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mermaid-modal-overlay';

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'mermaid-modal';

        // Create close button (floating)
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mermaid-modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', '关闭');

        // Create content
        const content = document.createElement('div');
        content.className = 'mermaid-modal-content';
        content.innerHTML = svgContent;

        // Assemble modal
        modal.appendChild(closeBtn);
        modal.appendChild(content);
        overlay.appendChild(modal);

        // Add to body
        document.body.appendChild(overlay);

        // Initialize panzoom on the SVG in modal
        let panzoomInstance = null;
        const svgElement = content.querySelector('svg');
        if (svgElement && typeof panzoom !== 'undefined') {
            panzoomInstance = panzoom(svgElement, {
                panEnabled: true,
                zoomEnabled: true,
                controlIconsEnabled: false,
                dblClickZoomEnabled: true,
                mouseWheelZoomEnabled: true,
                maxZoom: 5,
                minZoom: 0.5
            });
        }

        // Close handlers
        const closeModal = () => {
            overlay.classList.remove('show');
            setTimeout(() => {
                if (panzoomInstance) {
                    panzoomInstance.dispose();
                }
                overlay.remove();
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Prevent clicks inside modal from closing it
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Show modal with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
        });
    }

    function initializeMermaid() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const mermaidTheme = isDarkTheme ? 'dark' : 'default';

        mermaid.initialize({
            startOnLoad: false,
            theme: mermaidTheme,
            flowchart: { useMaxWidth: true },
            securityLevel: 'loose',
            logLevel: 'silent',
            suppressErrorRendering: true,
            errorHandler: function(error) {
                console.log('Mermaid.js error (intercepted):', error);
            }
        });
        console.log(`Mermaid configuration applied with theme: ${mermaidTheme}`);
    }

    const mermaidDiagramTypes = [
        "graph", "sequenceDiagram", "classDiagram", "flowchart", "stateDiagram", "stateDiagram-v2",
        "erDiagram", "journey", "gantt", "pie", "quadrantChart", "requirementDiagram", "gitGraph",
        "C4Context", "C4Container", "C4Component", "C4Dynamic", "packet-beta", "C4Deployment",
        "mindmap", "timeline", "zenuml", "xychart-beta", "block-beta", "radar-beta", "sankey-beta",
    ];

    function isMermaidCode(textContent) {
        if (!textContent || typeof textContent !== 'string') return false;
        const firstLine = textContent.trim().split('\n')[0].trim();
        return mermaidDiagramTypes.some(type => firstLine.startsWith(type));
    }

    function isErrorSvg(svgString) {
        return svgString.includes('aria-roledescription="error"') ||
               svgString.includes('class="error-icon"') ||
               svgString.includes('class="error-text"') ||
               svgString.includes('Syntax error in text');
    }

    function downloadSvg(svgContent, filename) {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function createErrorDisplay(errorMessage, mermaidCode) {
        const errorBox = document.createElement('div');
        errorBox.className = 'mermaid-error-box';

        const errorTitle = document.createElement('div');
        errorTitle.className = 'mermaid-error-title';
        errorTitle.innerHTML = icons.error + '<span>Mermaid 渲染失败</span>';
        errorBox.appendChild(errorTitle);

        const errorMsg = document.createElement('div');
        errorMsg.className = 'mermaid-error-message';
        errorMsg.textContent = errorMessage;
        errorBox.appendChild(errorMsg);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'mermaid-error-actions';

        const copyErrorButton = document.createElement('button');
        copyErrorButton.className = 'mermaid-error-button';
        copyErrorButton.textContent = '复制错误信息';
        copyErrorButton.addEventListener('click', () => {
            const fullError = `Mermaid 渲染错误:\n${errorMessage}`;
            navigator.clipboard.writeText(fullError).then(() => {
                copyErrorButton.textContent = '已复制！';
                setTimeout(() => {
                    copyErrorButton.textContent = '复制错误信息';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                copyErrorButton.textContent = '复制失败';
            });
        });
        actionsDiv.appendChild(copyErrorButton);

        const copyCodeButton = document.createElement('button');
        copyCodeButton.className = 'mermaid-error-button';
        copyCodeButton.textContent = '复制代码';
        copyCodeButton.addEventListener('click', () => {
            navigator.clipboard.writeText(mermaidCode).then(() => {
                copyCodeButton.textContent = '已复制！';
                setTimeout(() => {
                    copyCodeButton.textContent = '复制代码';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
        actionsDiv.appendChild(copyCodeButton);

        errorBox.appendChild(actionsDiv);
        return errorBox;
    }

    async function renderMermaidBlocks(container) {
        const selector = 'code[data-test-id="code-content"], ms-code-block pre code';
        const codeBlocks = container.querySelectorAll(selector);

        for (const codeBlock of codeBlocks) {
            if (isMermaidCode(codeBlock.textContent) && !codeBlock.dataset.mermaidProcessed) {
                initializeMermaid();

                const mermaidCode = codeBlock.textContent.trim();
                const diagramId = 'mermaid-diagram-' + Math.random().toString(36).substr(2, 9);

                if (mermaidCode.length > 0) {
                    try {
                        const codeBlockParent = codeBlock.closest('code-block, ms-code-block');
                        if (!codeBlockParent) {
                            console.warn('Could not find a suitable parent (<code-block> or <ms-code-block>) for Mermaid code. Skipping.');
                            codeBlock.dataset.mermaidProcessed = 'true';
                            continue;
                        }

                        const { svg } = await mermaid.render(diagramId, mermaidCode);
                        const renderedSvgContent = svg;

                        if (isErrorSvg(renderedSvgContent)) {
                            throw new Error('Mermaid rendered an error SVG, likely due to syntax issues in the code.');
                        }

                        // --- SUCCESS PATH ---
                        const mermaidWrapper = document.createElement('div');
                        mermaidWrapper.className = 'mermaid-output-wrapper';

                        const originalCodeDisplay = document.createElement('pre');
                        originalCodeDisplay.className = 'original-mermaid-code';
                        originalCodeDisplay.textContent = mermaidCode;
                        originalCodeDisplay.style.display = 'none';
                        mermaidWrapper.appendChild(originalCodeDisplay);

                        const svgContainer = document.createElement('div');
                        svgContainer.id = diagramId;
                        svgContainer.className = 'mermaid-rendered-diagram';
                        svgContainer.innerHTML = renderedSvgContent;
                        mermaidWrapper.appendChild(svgContainer);

                        // Add click handler to open modal
                        svgContainer.addEventListener('click', () => {
                            openMermaidModal(renderedSvgContent, mermaidCode);
                        });

                        const controlsDiv = document.createElement('div');
                        controlsDiv.className = 'mermaid-controls';

                        const copyCodeButton = document.createElement('button');
                        copyCodeButton.innerHTML = icons.copy + '<span>Copy Code</span>';
                        copyCodeButton.addEventListener('click', () => {
                            navigator.clipboard.writeText(mermaidCode).then(() => {
                                const originalText = copyCodeButton.innerHTML;
                                copyCodeButton.innerHTML = icons.check + '<span>已复制！</span>';
                                copyCodeButton.classList.add('success');
                                setTimeout(() => {
                                    copyCodeButton.innerHTML = originalText;
                                    copyCodeButton.classList.remove('success');
                                }, 2000);
                            }).catch(err => {
                                console.error('复制失败:', err);
                                copyCodeButton.innerHTML = icons.copy + '<span>复制失败</span>';
                            });
                        });
                        controlsDiv.appendChild(copyCodeButton);

                        mermaidWrapper.appendChild(controlsDiv);
                        codeBlockParent.replaceWith(mermaidWrapper);
                        codeBlock.dataset.mermaidProcessed = 'true';
                        console.log('Mermaid diagram rendered successfully.');

                    } catch (error) {
                        // --- ERROR PATH ---
                        console.warn('Failed to render Mermaid diagram. Leaving original code block. Error:', error);
                        console.warn('Offending Mermaid code:', mermaidCode);

                        const codeBlockParent = codeBlock.closest('code-block, ms-code-block');
                        if (codeBlockParent) {
                            // Create error wrapper
                            const errorWrapper = document.createElement('div');
                            errorWrapper.className = 'mermaid-output-wrapper';

                            // Add error display
                            const errorMessage = error.message || error.toString();
                            const errorDisplay = createErrorDisplay(errorMessage, mermaidCode);
                            errorWrapper.appendChild(errorDisplay);

                            // Add original code display
                            const originalCodeDisplay = document.createElement('pre');
                            originalCodeDisplay.className = 'original-mermaid-code';
                            originalCodeDisplay.textContent = mermaidCode;
                            errorWrapper.appendChild(originalCodeDisplay);

                            // Replace the code block
                            codeBlockParent.replaceWith(errorWrapper);
                        }

                        codeBlock.dataset.mermaidProcessed = 'true';
                        // Attempt to remove any incomplete mermaid rendering artifacts
                        const potentialErrorDiv = document.querySelector(`#d${diagramId}`);
                        if (potentialErrorDiv) {
                            potentialErrorDiv.remove();
                        }
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1 && (node.matches('code-block, ms-code-block, ms-chat-turn') || node.querySelector('code-block, ms-code-block'))) {
                        renderMermaidBlocks(node);
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        setTimeout(() => renderMermaidBlocks(document.body), 500);
        setTimeout(() => renderMermaidBlocks(document.body), 1500);
    });
})();