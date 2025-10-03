import ProblemCard from '../ProblemCard';

export default function ProblemCardExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <ProblemCard 
        title="Two Sum"
        difficulty="Easy"
        description="Given an array of integers, return indices of the two numbers that add up to a specific target."
        timeLimit="1 second"
        onSolve={() => console.log('Solve problem clicked')}
      />
    </div>
  );
}
