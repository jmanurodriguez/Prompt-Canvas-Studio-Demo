const Navigation = () => {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          {/* ... */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* ... */}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
} 