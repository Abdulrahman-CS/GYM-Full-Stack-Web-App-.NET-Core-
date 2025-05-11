using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using GYM_API.Models;
using GYM_API.Models.DTO;

namespace GYM_API.Mappers
{
    public static class GeneralMappers
    {
        public static Feedback FromFeedbackDtoToFeedback(this CreateFeedbackDto createFeedbackDto)
        {
            return new Feedback
            {
                FirstName = createFeedbackDto.FirstName,
                LastName = createFeedbackDto.LastName,
                Email = createFeedbackDto.Email,
                Phone = createFeedbackDto.Phone,
                Age = createFeedbackDto.Age,
                Gender = createFeedbackDto.Gender,
                MembershipId = createFeedbackDto.MembershipId,
                Goals = createFeedbackDto.Goals,
                City = createFeedbackDto.City,
                PreferredLocation = createFeedbackDto.PreferredLocation,
                ServicesUserUsed = createFeedbackDto.ServicesUserUsed,
                FacilitiesUserUsed = createFeedbackDto.FacilitiesUserUsed,
                AboutUs = createFeedbackDto.AboutUs,
                Days = createFeedbackDto.Days,
                Feedback1 = createFeedbackDto.Feedback1
            };
        }



    }
}