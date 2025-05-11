using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GYM_API.Models;
using GYM_API.Models.DTO;
using GYM_API.Repositories;
using GYM_API.Mappers;
using Microsoft.IdentityModel.Tokens;

namespace GYM_API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class HomeController : Controller
{
    private FeedbackRepository _feedbackRepository;
    public HomeController(FeedbackRepository feedbackRepository)
    {
        _feedbackRepository = feedbackRepository;
    }


    [HttpPost("CreateFeedback")]
    public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackDto createFeedbackDto)
    {
        if (createFeedbackDto is null)
        {
            return BadRequest();
        }
        var feedback = createFeedbackDto.FromFeedbackDtoToFeedback();
        var result = await _feedbackRepository.AddFeedbackToDataBase(feedback);
        if (result is null)
        {
            return BadRequest("Can not create, Feedback already exists");
        }
        return Ok("User Feedback has been added successfully");
    }


    [HttpGet("GetEquipment")]
    public async Task<IActionResult> GetEquipments(int Page = 1, int PageSize= 25)
    {
        
        var result = await _feedbackRepository.GetEquipmentsFromDataBase(Page , PageSize );
        if (result is null)
        {
            return BadRequest("There is no data");
        }
        return Ok(result);
    }

    [HttpGet("GetCoachesRating")]
    public async Task<IActionResult> GetCoachesRating(int Page = 1, int PageSize= 10)
    {
        
        var result = await _feedbackRepository.GetCoachesRatingFromDataBase(Page, PageSize);
        if (result is null)
        {
            return BadRequest("There is no data");
        }
        return Ok(result);
    }

    [HttpPost("AddEquipment")]
    public async Task<IActionResult> AddEquipment([FromBody] CreateFeedbackDto createFeedbackDto)
    {
        if (createFeedbackDto is null)
        {
            return BadRequest();
        }
        var feedback = createFeedbackDto.FromFeedbackDtoToFeedback();
        var result = await _feedbackRepository.AddFeedbackToDataBase(feedback);
        if (result is null)
        {
            return BadRequest("Can not create, Feedback already exists");
        }
        return Ok("User Feedback has been added successfully");
    }
}
