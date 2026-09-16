using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

using Entry.Auth.Data;
using Entry.Auth.Models;
using Entry.Auth.DTOs;

using Task = TasksApp.Models.Task;
using TasksApp.DTOs;

namespace TasksApp.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class TasksController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public TasksController(
      AppDbContext context,
      IWebHostEnvironment env
    )
    {
      _context = context;
      _env = env;
    }

    private string GetUserId() => User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks()
    {
      var userId = GetUserId();
      var tasks = await _context.Tasks
        .Where(t => t.AppUserId == userId)
        .OrderByDescending(t => t.CreatedAt)
        .Select(t => new TaskDTO
        {
          Id = t.Id,
          Title = t.Title,
          Description = t.Description,
          IsCompleted = t.IsCompleted,
          DueDate = t.DueDate,
          FileUrl = t.FileUrl,
          FileName = t.FileName,
          CreatedAt = t.CreatedAt,
          UpdatedAt = t.UpdatedAt
        })
        .ToListAsync();

      return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDTO>> GetTask(int id)
    {
      var userId = GetUserId();
      var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == userId);

      if(task == null)
        return NotFound(new { error = "Task not found"});

      return Ok(new TaskDTO
      {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        IsCompleted = task.IsCompleted,
        DueDate = task.DueDate,
        FileUrl = task.FileUrl,
        FileName = task.FileName,
        CreatedAt = task.CreatedAt,
        UpdatedAt = task.UpdatedAt
      });
    }

    [HttpPost]
    public async Task<ActionResult<TaskDTO>> CreateTask([FromBody] CreateTaskDTO dto)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var userId = GetUserId();
      var task = new Task
      {
        Title = dto.Title,
        Description = dto.Description,
        DueDate = dto.DueDate,
        IsCompleted = false,
        AppUserId = userId,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
      };

      _context.Tasks.Add(task);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetTask), new { id = task.Id }, new TaskDTO
      {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        IsCompleted = task.IsCompleted,
        DueDate = task.DueDate,
        FileUrl = task.FileUrl,
        FileName = task.FileName,
        CreatedAt = task.CreatedAt,
        UpdatedAt = task.UpdatedAt
      });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDTO dto)
    {
      if(string.IsNullOrWhiteSpace(dto.Title))
      {
        ModelState.AddModelError("Title", "Title is required.");
      }

      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var userId = GetUserId();
      var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == userId);

      if(task == null)
        return NotFound(new { error = "Task not found" });

      task.Title = dto.Title;
      task.Description = dto.Description;
      task.IsCompleted = dto.IsCompleted;
      task.DueDate = dto.DueDate;
      task.UpdatedAt = DateTime.UtcNow;

      _context.Tasks.Update(task);
      await _context.SaveChangesAsync();

      return Ok(new TaskDTO
      {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        IsCompleted = task.IsCompleted,
        DueDate = task.DueDate,
        FileUrl = task.FileUrl,
        FileName = task.FileName,
        CreatedAt = task.CreatedAt,
        UpdatedAt = task.UpdatedAt
      });
    }

    [HttpPost("{id}/upload")]
    public async Task<IActionResult> UploadFile(int id, IFormFile file)
    {
      if(file == null || file.Length == 0)
        return BadRequest(new { error = "No file uploaded" });

      var userId = GetUserId();
      var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == userId);

      if(task == null)
        return NotFound(new { error = "Task not found" });

      try
      {
        var uploadDir = Path.Combine(_env.WebRootPath, "uploads");
        if(!Directory.Exists(uploadDir))
          Directory.CreateDirectory(uploadDir);

        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadDir, fileName);

        using(var stream = new FileStream(filePath, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }

        task.FileUrl = $"/uploads/{fileName}";
        task.FileName = file.FileName;
        task.UpdatedAt = DateTime.UtcNow;

        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();

        return Ok(new { fileUrl = task.FileUrl, fileName = task.FileName });
      }
      catch(Exception ex)
      {
        return StatusCode(500, new { error = "File upload failed", details = ex.Message });
      }
    }
  }
}