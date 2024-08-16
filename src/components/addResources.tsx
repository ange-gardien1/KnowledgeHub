'use client'
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export function ResourcePopover() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [video, setVideo] = useState("");
    const [description, setDescription] = useState("");
  
    const addResourceMutation = trpc.resources.createResource.useMutation();
  
    const handleSave = async () => {
      try {
        await addResourceMutation.mutateAsync({
         
          title,
          url: link, 
          type: video ? "video" : "link",
          description,
        });
        alert("Resource added successfully!");
      } catch (error) {
        console.error("Failed to add resource:", error);
        alert("Failed to add resource. Please try again.");
      }
    };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Add Resource</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add a Resource</h4>
              <p className="text-sm text-muted-foreground">
                Fill in the details to add a new resource.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="video">Video URL</Label>
                <Input
                  id="video"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleSave} className="w-full">Save Resource</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }