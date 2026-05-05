export default function Footer() {
  return (
    <footer className="glass p-4 mt-8 bg-slate-900/80 backdrop-blur-md border-t border-slate-700">
      <div className="container mx-auto flex justify-center space-x-6">
        <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Discord</a>
        <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Twitter</a>
        <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Reddit</a>
      </div>
    </footer>
  )
}