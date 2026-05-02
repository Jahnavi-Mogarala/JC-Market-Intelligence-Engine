export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-surface border border-white/10 overflow-hidden">
              <span className="font-heading font-bold text-sm text-gradient-primary">JC</span>
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight text-white/80">
              Intelligence Systems
            </span>
          </div>
          
          <div className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} JC Market Intelligence Engine. Powered by JC Intelligence Systems.
          </div>
          
          <div className="flex gap-4 text-sm text-white/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
