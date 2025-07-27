import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { Toggle } from './ui/toggle';
import sploshLogo from '@/assets/splosh-coin.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Section highlighting logic
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'features', 'iko'];
    const sections = sectionIds.map(id => document.getElementById(id));
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    const handleIntersect = (entries) => {
      // Find the entry that is most in view
      let maxRatio = 0;
      let visibleId = 'home';
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleId = entry.target.id;
        }
      });
      setActiveSection(visibleId);
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: [0.3, 0.5, 0.7, 1.0],
    });
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', section: 'home', isRoute: false },
    { name: 'About', href: '#about', section: 'about', isRoute: false },
    { name: 'Features', href: '#features', section: 'features', isRoute: false },
    { name: 'IKO', href: '#iko', section: 'iko', isRoute: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-[3.5em] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={sploshLogo} alt="Splosh Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-jakarta text-foreground">SPLOSH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                style={{
                  border: 'none',
                  width: '7em',
                  height: '2em', // reduced from 2.5em
                  borderRadius: '1.5em',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 450ms cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'none',
                  outline: 'none',
                  position: 'relative',
                  boxSizing: 'content-box',
                  fontFamily: 'inherit',
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                onClick={() => {
                  window.location.href = item.href;
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6 0%, #06d6ff 100%)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 4px #fff8, 0 0 24px 8px #06d6ffcc, 0 0 48px 16px #3b82f6cc';
                  e.currentTarget.style.transform = 'scale(1.07) translateY(-2px)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.color = '#aaaaaa';
                }}
              >
                <svg
                  style={{
                    fill: '#aaaaaa',
                    transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  onMouseOver={e => (e.currentTarget.style.fill = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.fill = '#aaaaaa')}
                >
                  <path d="M10 2L11.09 6.26L15 7.27L12 10.14L12.82 14.02L10 12.13L7.18 14.02L8 10.14L5 7.27L8.91 6.26L10 2Z" />
                </svg>
                <span
                  style={{
                    fontWeight: 600,
                    color: '#aaaaaa',
                    fontSize: 'medium',
                    transition: 'color 450ms cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = '#aaaaaa')}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Toggle
              pressed={theme === 'dark'}
              variant={"outline"}
              onPressedChange={toggleTheme}
              aria-label="Toggle theme"
              className={`ml-2 transition-all duration-500 ${theme === 'dark' ? 'btn-glow' : ''}`}
            >
              {theme === 'dark' ? <Sun size={16} className="glow transition-all duration-500" /> : <Moon size={16} />}
            </Toggle>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                      key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${activeSection === item.section
                        ? 'text-primary'
                        : 'hover:text-primary'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Toggle
                    pressed={theme === 'dark'}
                    variant="outline"
                    size="sm"
                    onPressedChange={toggleTheme}
                    aria-label="Toggle theme"
                    className={`ml-2 transition-all duration-500 ${theme === 'dark' ? 'btn-glow' : ''}`}
                  >
                    {theme === 'dark' ? <Sun size={16} className="glow transition-all duration-500" /> : <Moon size={16} />}
                  </Toggle>
                  <Button onClick={() => navigate("/login")} className="justify-start">Login</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;