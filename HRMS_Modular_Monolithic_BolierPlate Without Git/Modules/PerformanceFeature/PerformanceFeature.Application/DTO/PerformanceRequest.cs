using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;
using System.Collections.Generic;

namespace PerformanceFeature.Application.DTO
{
    public interface IPerformanceReviewIdDto { string? PerformanceReviewId { get; set; } }

    public class GoalDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public decimal ProgressPercentage { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class CreatePerformanceReviewDto
    {
        public string? EmployeeId { get; set; }
        public string? ReviewerId { get; set; }
        public string? ReviewCycle { get; set; }
        public List<GoalDto>? Goals { get; set; }
    }

    public class CreatePerformanceReviewCommand : ExecutionRequest, IRequest<BaseResponse<CreatePerformanceReviewResponse>>
    {
        public CreatePerformanceReviewDto? RequestParam { get; set; }
    }

    public class UpdatePerformanceReviewDto : IPerformanceReviewIdDto
    {
        public string? PerformanceReviewId { get; set; }
        public string? Status { get; set; } // SelfEvaluation, ManagerEvaluation, Completed
        public string? EmployeeComments { get; set; }
        public string? ManagerComments { get; set; }
        public decimal? Rating { get; set; }
        public List<GoalDto>? Goals { get; set; }
    }

    public class UpdatePerformanceReviewCommand : ExecutionRequest, IRequest<BaseResponse<UpdatePerformanceReviewResponse>>
    {
        public UpdatePerformanceReviewDto? RequestParam { get; set; }
    }

    public class GetAllPerformanceReviewsDto
    {
        public string? PerformanceReviewId { get; set; }
        public string? EmployeeId { get; set; }
        public string? ReviewerId { get; set; }
        public string? ReviewCycle { get; set; }
        public string? Status { get; set; }
    }

    public class GetAllPerformanceReviewsQuery : Request, IRequest<BaseResponsePagination<GetAllPerformanceReviewsResponse>>
    {
        public GetAllPerformanceReviewsDto? RequestParam { get; set; }
    }
}
