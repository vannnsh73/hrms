using HRMS.Core.Postgres.Common;
using System.Collections.Generic;

namespace PerformanceFeature.Domain
{
    public class Goal
    {
        public string? GoalId { get; set; } = Guid.NewGuid().ToString();
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; } // NotStarted, InProgress, Completed
        public decimal ProgressPercentage { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class PerformanceReview : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? ReviewerId { get; set; }
        public string? ReviewCycle { get; set; } // e.g., "Q1 2024", "Annual 2024"
        public string? Status { get; set; } // Draft, SelfEvaluation, ManagerEvaluation, Completed
        public DateTime? ReviewDate { get; set; }
        public string? EmployeeComments { get; set; }
        public string? ManagerComments { get; set; }
        public decimal Rating { get; set; } // e.g., 1 to 5 scale
        public List<Goal>? Goals { get; set; }
    }
}
