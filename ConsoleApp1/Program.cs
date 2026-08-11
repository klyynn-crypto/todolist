public class ToDoList
{

    public static string[] tasks = new string[10];
    public static int taskCount = 0;

   public static void AddTask()
    {
        Console.WriteLine("Enter a new task:");
        string? input = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(input))
        {
            Console.WriteLine("Task cannot be empty.");
            return;
        }

        if (taskCount >= tasks.Length)
        {
            Console.WriteLine("Task list is full.");
            return;
        }

        tasks[taskCount++] = input;
    }

public static void ViewTasks()
    {
        for (int i = 0; i < taskCount; i++)
        {
            Console.WriteLine((i + 1) + ". " + tasks[i]);
        }
    }

public static void CompleteTask()
    {
        Console.WriteLine("Enter the number of the task to mark as complete:");
        string? input = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(input) || !int.TryParse(input.Trim(), out int taskNumber))
        {
            Console.WriteLine("Invalid task number.");
            return;
        }

        taskNumber--;
        if (taskNumber >= 0 && taskNumber < taskCount)
        {
            tasks[taskNumber] += " (Completed)";
            Console.WriteLine("Task marked as complete.");
        }
        else
        {
            Console.WriteLine("Invalid task number.");
        }
    }

    public static void Main(string[] args)
    {
        bool running = true;

        while (running)
        {
            Console.WriteLine("What would you like to do?");
            Console.WriteLine("1. Add a task");
            Console.WriteLine("2. View tasks");
            Console.WriteLine("3. Mark a task as complete");
            Console.WriteLine("4. Exit");

            string? choice = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(choice))
            {
                Console.WriteLine("No input. Please enter 1-4.");
                continue;
            }

            switch (choice.Trim())
            {
                case "1":
                    AddTask();
                    break;
                case "2":
                    ViewTasks();
                    break;
                case "3":
                    CompleteTask();
                    break;
                case "4":
                    running = false;
                    break;
                default:
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}