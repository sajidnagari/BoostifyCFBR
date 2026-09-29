'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  Activity,
  BarChart3,
  ChevronDown,
  CircleHelp,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Radar,
  Search,
  Settings2,
  Sparkles,
  Target,
  UserRound,
  X,
} from 'lucide-react';
import { Button } from '@companyio/platform-ui/dist/components/ui/button';
import { useProfile } from '../../features/profile/hooks/use-profile';

const primaryNavigation = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/opportunities', label: 'Opportunities', icon: Radar },
  { href: '/posts', label: 'Post library', icon: FileText },
  { href: '/comments', label: 'Comment intelligence', icon: MessageSquareText },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/strategies', label: 'Strategies', icon: Target },
];

const settingsNavigation = [
  { href: '/settings/profile', label: 'Expertise profile', icon: UserRound },
  { href: '/settings/accounts', label: 'Connected accounts', icon: Settings2 },
];

const titleByPath: Record<string, string> = {
  '/': 'Overview',
  '/dashboard': 'Overview',
  '/opportunities': 'Opportunity discovery',
  '/posts': 'Post library',
  '/comments': 'Comment intelligence',
  '/analytics': 'Performance analytics',
  '/strategies': 'Strategy intelligence',
  '/settings/profile': 'Expertise profile',
  '/settings/accounts': 'Connected accounts',
  '/generate': 'Comment studio',
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`));
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase() || 'U';
}

function NavigationLink({ href, label, icon: Icon, active, compact = false, onClick }: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`group flex min-h-10 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${active ? 'bg-[#24483a] font-semibold text-white' : 'text-[#afc3b7] hover:bg-white/8 hover:text-white'} ${compact ? 'flex-col justify-center gap-1 px-1 py-2 text-[10px]' : ''}`}
    >
      <Icon className={compact ? 'size-4.5' : 'size-4'} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
      <span className={compact ? 'max-w-full truncate' : 'min-w-0 flex-1'}>{label}</span>
      {!compact && label === 'Opportunities' && <span className="rounded bg-[#d7a96b] px-1.5 py-0.5 text-[10px] font-bold text-[#20352b]">08</span>}
      {active && !compact && <span className="size-1.5 rounded-full bg-[#e9b879]" aria-hidden="true" />}
    </Link>
  );
}

export function ProductShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pageTitle = titleByPath[pathname] ?? Object.entries(titleByPath).find(([path]) => pathname.startsWith(`${path}/`))?.[1] ?? 'Comment Growth AI';
  const searchResults = [...primaryNavigation, ...settingsNavigation].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#19271f]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-66 flex-col border-r border-white/8 bg-[#132a22] text-white lg:flex">
        <Link href="/dashboard" className="flex h-19 items-center gap-3 border-b border-white/8 px-5" aria-label="Comment Growth AI home">
          <span className="grid size-9 place-items-center rounded-lg bg-[#d7a96b] text-[#14291f]"><Activity className="size-5" /></span>
          <span className="min-w-0">
            <span className="block text-sm font-bold tracking-wide">COMMENT GROWTH</span>
            <span className="mt-0.5 block text-[10px] uppercase text-[#9db5a8]">Intelligence workspace</span>
          </span>
        </Link>

        <div className="mx-4 mt-5 rounded-md border border-white/10 bg-white/5 px-3 py-2.5">
          <span className="block text-[10px] uppercase text-[#9db5a8]">Workspace</span>
          <span className="mt-1 flex items-center justify-between text-[13px] font-medium">Personal brand <ChevronDown className="size-3.5 text-[#9db5a8]" /></span>
        </div>

        <nav aria-label="Main navigation" className="mt-6 flex-1 overflow-y-auto px-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#718d7e]">Intelligence</p>
          <div className="grid gap-1">
            {primaryNavigation.map((item) => (
              <NavigationLink key={item.href} {...item} active={isActivePath(pathname, item.href)} />
            ))}
          </div>
          <p className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#718d7e]">Workspace settings</p>
          <div className="grid gap-1">
            {settingsNavigation.map((item) => (
              <NavigationLink key={item.href} {...item} active={isActivePath(pathname, item.href)} />
            ))}
          </div>
        </nav>

        <div className="border-t border-white/8 p-4">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d9e2db] text-sm font-bold text-[#24483a]">{getInitials(profile.name)}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{profile.name || 'Your profile'}</span>
              <span className="block truncate text-[11px] text-[#9db5a8]">{profile.role || 'Add your role'}</span>
            </span>
            <CircleHelp className="size-4 text-[#9db5a8]" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-66">
        <header className="sticky top-0 z-20 flex h-17 items-center justify-between border-b border-[#e0e6e0] bg-[#f8faf7]/95 px-4 backdrop-blur md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2.5 lg:hidden">
              <span className="grid size-8 place-items-center rounded-md bg-[#17352a] text-[#f0c487]"><Activity className="size-4" /></span>
              <span className="text-xs font-bold tracking-wide">COMMENT GROWTH</span>
            </Link>
            <span className="hidden text-[13px] font-semibold text-[#405348] lg:block">{pageTitle}</span>
            <span className="hidden rounded-full border border-[#d4dfd6] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#45604f] sm:inline-flex">Demo workspace</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <Button variant="ghost" size="sm" className="h-9! gap-2 text-[#43554a]" onClick={() => setSearchOpen((open) => !open)} aria-expanded={searchOpen} aria-label="Search workspace">
              <Search className="size-4" /><span className="hidden sm:inline">Search</span><kbd className="hidden rounded border border-gray-200 px-1 text-[10px] text-gray-400 md:inline">⌘ K</kbd>
            </Button>
            <Link href="/opportunities" className="hidden sm:inline-flex">
              <Button size="sm" className="h-9! gap-2 bg-[#173b2d] text-white hover:bg-[#24533e]"><Sparkles className="size-4" /> Find opportunities</Button>
            </Link>
          </div>
          <AnimatePresence>
            {searchOpen && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-4 top-14.5 z-40 w-[min(380px,calc(100vw-2rem))] rounded-lg border border-[#dce4dd] bg-white p-3 shadow-xl md:right-7">
                <label className="flex items-center gap-2 rounded-md border border-[#d9e2db] px-3">
                  <Search className="size-4 text-[#738278]" />
                  <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search product areas" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#89958c]" />
                  <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="size-4 text-[#738278]" /></button>
                </label>
                <div className="mt-2 grid gap-1">
                  {searchResults.map((item) => <Link key={item.href} href={item.href} onClick={() => setSearchOpen(false)} className="flex items-center gap-2 rounded px-2 py-2 text-sm text-[#405348] hover:bg-[#f2f6f2]"><item.icon className="size-4" />{item.label}</Link>)}
                  {!searchResults.length && <p className="px-2 py-3 text-sm text-[#69786e]">No product areas match “{searchQuery}”.</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pathname} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.16, ease: 'easeOut' }} className="mx-auto min-h-[calc(100vh-68px)] max-w-370 px-4 pb-24 pt-6 md:px-7 md:pt-8 lg:pb-10">
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#dce4dd] bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 backdrop-blur lg:hidden">
        {primaryNavigation.slice(0, 4).map((item) => (
          <NavigationLink key={item.href} {...item} active={isActivePath(pathname, item.href)} compact />
        ))}
        <button type="button" onClick={() => setMobileMoreOpen((open) => !open)} aria-expanded={mobileMoreOpen} className={`flex min-h-10 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-[10px] ${mobileMoreOpen ? 'text-[#173b2d]' : 'text-[#617166]'}`}>
          <Menu className="size-4.5" /><span>More</span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileMoreOpen && (
          <>
            <motion.button aria-label="Close more navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMoreOpen(false)} className="fixed inset-0 z-30 bg-[#14291f]/20 lg:hidden" />
            <motion.nav aria-label="More destinations" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-18 right-3 z-40 w-64 rounded-lg border border-[#dce4dd] bg-white p-2 shadow-xl lg:hidden">
              {[...primaryNavigation.slice(4), ...settingsNavigation].map((item) => (
                <NavigationLink key={item.href} {...item} active={isActivePath(pathname, item.href)} onClick={() => setMobileMoreOpen(false)} />
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}