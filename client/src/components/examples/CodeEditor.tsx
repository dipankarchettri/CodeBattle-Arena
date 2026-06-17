import CodeEditor from '../CodeEditor';

export default function CodeEditorExample() {
  return (
    <div className="h-screen bg-background">
      <CodeEditor problemId="example-problem-id" isLocked={false} boilerplatePython="# Write your solution here" />
    </div>
  );
}
