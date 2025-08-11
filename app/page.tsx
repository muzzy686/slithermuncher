'use client';

import { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, HelpCircle, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // 超时处理
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 8000);

    // 监听全屏状态变化
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const retryLoad = () => {
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <>
      {/* SEO 头部信息通过 layout.tsx 和 metadata 处理 */}
      <div className="min-h-screen bg-slate-950 text-blue-50 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                  slithermuncher
                </h1>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHelp(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-white/10"
                  aria-label="Help & Info"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Help</span>
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-white/10"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  <span className="hidden sm:inline">
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Game Stage */}
            <div className="relative aspect-video bg-slate-900/50 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    <p className="text-blue-200 font-medium">Loading Slither.io...</p>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/90 backdrop-blur-sm">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gamepad2 className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-300 mb-2">Failed to Load Game</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                      The game couldn't load due to network issues or third-party restrictions. 
                      Try refreshing or open the original site.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={retryLoad}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                      >
                        Retry
                      </button>
                      <a
                        href="https://slithergame.io/slither-io.embed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors font-medium text-center"
                      >
                        Open Original Site
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Game iframe */}
              <iframe
                ref={iframeRef}
                src="https://slithergame.io/slither-io.embed"
                title="Slither.io Game"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
                allow="fullscreen; autoplay; clipboard-read; clipboard-write;"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>

            {/* Game Description */}
            <div className="mt-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                Play Slither.io Instantly
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Experience the classic Slither.io game directly in your browser. No downloads, no registration required. 
                Control your snake, eat glowing orbs, grow longer, and dominate the leaderboard. Perfect for quick gaming 
                sessions on desktop and mobile devices. Use fullscreen mode for the best experience, especially on mobile.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-slate-400 text-sm">
              <p className="mb-2">
                Not affiliated with Slither.io. Content © respective owners.
              </p>
              <p>
                If you are the rights holder and want this page modified or removed, contact:{' '}
                <a href="mailto:admin@slithermuncher.xyz" className="text-blue-400 hover:text-blue-300">
                  admin@slithermuncher.xyz
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-300">Game Help & Info</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-semibold text-blue-200 mb-2">How to Play</h4>
                <p className="text-sm">
                  Control your snake with mouse movement or arrow keys. Eat glowing orbs to grow longer. 
                  Avoid hitting other snakes or you'll explode and become food!
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-200 mb-2">Controls</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mouse: Move snake direction</li>
                  <li>• Left Click / Space: Boost (consumes length)</li>
                  <li>• Arrow Keys: Alternative movement</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-200 mb-2">Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use fullscreen for better experience</li>
                  <li>• Mobile: Use landscape mode</li>
                  <li>• Boost wisely - it makes you smaller</li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-400">
                  Source: <a href="https://slithergame.io" className="text-blue-400">slithergame.io</a> (embedded).
                  This site is unofficial and provides a clean access point to the original game.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}