using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Models;

public partial class GymDbContext : DbContext
{
    public GymDbContext()
    {
    }

    public GymDbContext(DbContextOptions<GymDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Coach> Coaches { get; set; }

    public virtual DbSet<Equipment> Equipments { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:GYM_DB ");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Coach>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Coaches__3214EC07A53767EF");
        });

        modelBuilder.Entity<Equipment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Equipmen__3214EC07AF822E31");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Email).HasName("PK__Feedback__A9D1053558272C01");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.CoachId).HasName("PK__Rating__BDB636079AC0B94A");

            entity.Property(e => e.CoachId).ValueGeneratedNever();

            entity.HasOne(d => d.Coach).WithOne(p => p.Rating).HasConstraintName("FK_Rating_Coach");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
