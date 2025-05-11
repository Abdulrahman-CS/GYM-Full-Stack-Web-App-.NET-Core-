using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GYM_API.Models;
using GYM_API.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Repositories
{
    public class FeedbackRepository
    {
        private readonly GymDbContext _context;

        public FeedbackRepository(GymDbContext context)
        {
            _context = context;
        }
        public async Task<String> AddFeedbackToDataBase(Feedback feedback)
        {

            var check = await _context.Feedbacks.FirstOrDefaultAsync(x => x.Email == feedback.Email);
            if (check is not null)
            {
                return null;
            }
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return String.Empty;
        }
        public async Task<List<EquipmentDto>> GetEquipmentsFromDataBase(int Page, int PageSize)
        {
            List<EquipmentDto> equipments = await _context.Equipments
                .Skip((Page - 1) * PageSize)
                .Take(PageSize)
                .Select(e => new EquipmentDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Brand = e.Brand,
                    Category = e.Category,
                    TargetMuscle = e.TargetMuscle

                })
                .ToListAsync();
            return equipments;
        }

        public async Task<List<CoachesRatingDto>> GetCoachesRatingFromDataBase(int Page, int PageSize)
        {
            List<CoachesRatingDto> CoachesRatingList = await _context.Coaches.Skip((Page - 1) * PageSize).Take(PageSize)
            .GroupJoin(
                _context.Ratings.Skip((Page - 1) * PageSize).Take(PageSize),
                coach => coach.Id,
                rating => rating.CoachId,
                (coach, ratingGroup) => new CoachesRatingDto
                {
                    Id = coach.Id,
                    FirstName = coach.FirstName,
                    LastName = coach.LastName,
                    Bio = coach.Bio,
                    Age = coach.Age,

                    // pick the first rating in the group, or 0 if there are none
                    Rating = ratingGroup
                                    .Select(r => r.Rating1)
                                    .FirstOrDefault(),

                    // compute the average, or fall back to 0
                    Average = ratingGroup.Any()
                                ? ratingGroup.Average(r => r.Rating1)
                                : 0
                }
            )
            .ToListAsync();

            return CoachesRatingList;
        }
    }
}