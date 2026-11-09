import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, BookOpen, RotateCcw } from 'lucide-react';
import { COURSES, CATEGORIES, DIFFICULTIES } from '../data/coursesData';
import { CourseCard } from '../components/course/CourseCard';

export function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All Disciplines';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchTerm(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      // Search query filter
      const matchesSearch = searchTerm.trim() === '' ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skillsCovered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All Disciplines' || course.category === selectedCategory;

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'All Levels' || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return parseInt(b.duration) - parseInt(a.duration);
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Disciplines');
    setSelectedDifficulty('All Levels');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '4rem' }}>
      <div className="container">
        
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <span>THE MASTERCLASS LIBRARY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '0.6rem' }}>
            Curriculum of Masterclasses
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px' }}>
            Explore in-depth video masterclasses taught by senior industry architects across computing disciplines.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          
          {/* Top Row: Search Input + Sort Dropdown */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Search Input */}
            <div style={{ flex: '1 1 320px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by topic, instructor, or technique..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                style={{ paddingLeft: '40px' }}
              />
            </div>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={15} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  padding: '8px 12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Enrolled</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Discipline
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--trans-fast)',
                    border: '1px solid',
                    backgroundColor: selectedCategory === category ? 'var(--accent-bronze)' : 'var(--bg-tertiary)',
                    borderColor: selectedCategory === category ? 'var(--accent-bronze)' : 'var(--border-subtle)',
                    color: selectedCategory === category ? '#0b0b0e' : 'var(--text-secondary)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter Pills */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Skill Level
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {DIFFICULTIES.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--trans-fast)',
                    border: '1px solid',
                    backgroundColor: selectedDifficulty === difficulty ? 'var(--accent-bronze)' : 'var(--bg-tertiary)',
                    borderColor: selectedDifficulty === difficulty ? 'var(--accent-bronze)' : 'var(--border-subtle)',
                    color: selectedDifficulty === difficulty ? '#0b0b0e' : 'var(--text-secondary)'
                  }}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Metadata Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'masterclass' : 'masterclasses'}
            {selectedCategory !== 'All Disciplines' && <span> in <span style={{ color: 'var(--accent-bronze)' }}>{selectedCategory}</span></span>}
          </div>
          {(searchTerm || selectedCategory !== 'All Disciplines' || selectedDifficulty !== 'All Levels') && (
            <button
              onClick={handleResetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-bronze)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.825rem',
                fontWeight: 600
              }}
            >
              <RotateCcw size={13} />
              Reset filters
            </button>
          )}
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px dashed var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '540px',
            margin: '2rem auto'
          }}>
            <BookOpen size={42} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No masterclasses found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We couldn't find any courses matching "{searchTerm}". Try clearing your filters or selecting a different discipline.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              <RotateCcw size={14} />
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
